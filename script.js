(function () {
    'use strict';

    var COOLDOWN_MS = 10 * 60 * 1000;
    var MIN_INTERVAL_MS = 30 * 1000;
    var KEY_DISMISSED = 'socialBar.dismissedAt';
    var KEY_LAST_SHOWN = 'socialBar.lastShownAt';

    var bar = document.getElementById('socialBar');
    var closeBtn = document.getElementById('socialBarClose');
    var content = document.getElementById('socialBarContent');
    if (!bar || !closeBtn || !content) {
        return;
    }

    var placeholder = content.querySelector('.social-bar__placeholder');
    var ariaTimer = null;

    function readTime(key) {
        try {
            return parseInt(sessionStorage.getItem(key) || '0', 10) || 0;
        } catch (err) {
            return 0;
        }
    }

    function writeTime(key, value) {
        try {
            sessionStorage.setItem(key, String(value));
        } catch (err) {
            /* storage unavailable - cooldown simply resets on reload */
        }
    }

    function canShow() {
        var now = Date.now();
        if (now - readTime(KEY_DISMISSED) < COOLDOWN_MS) {
            return false;
        }
        return now - readTime(KEY_LAST_SHOWN) >= MIN_INTERVAL_MS;
    }

    function show() {
        if (!canShow()) {
            return;
        }
        writeTime(KEY_LAST_SHOWN, Date.now());
        window.clearTimeout(ariaTimer);
        bar.classList.add('is-visible');
        ariaTimer = window.setTimeout(function () {
            bar.setAttribute('aria-hidden', 'false');
        }, 350);
    }

    function hide(recordDismiss) {
        window.clearTimeout(ariaTimer);
        bar.classList.remove('is-visible');
        if (recordDismiss) {
            writeTime(KEY_DISMISSED, Date.now());
        }
        ariaTimer = window.setTimeout(function () {
            bar.setAttribute('aria-hidden', 'true');
        }, 350);
    }

    closeBtn.addEventListener('click', function () {
        hide(true);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && bar.classList.contains('is-visible')) {
            hide(true);
        }
    });

    // The provider script signals readiness in several ways; react to all of them.
    window.addEventListener('socialbar:show', show);
    window.addEventListener('adLoaded', show);
    window.addEventListener('adRendered', show);

    // Generic fallback: reveal the panel as soon as the provider injects creative.
    new MutationObserver(function (records) {
        var hasCreative = records.some(function (record) {
            return Array.prototype.some.call(record.addedNodes, function (node) {
                return node.nodeType === 1 && node !== placeholder;
            });
        });
        if (!hasCreative) {
            return;
        }
        if (placeholder && placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
        }
        show();
    }).observe(content, { childList: true, subtree: true });

    var demoBtn = document.getElementById('socialBarDemo');
    if (demoBtn) {
        demoBtn.addEventListener('click', function () {
            writeTime(KEY_DISMISSED, 0);
            writeTime(KEY_LAST_SHOWN, 0);
            show();
        });
    }

    window.SocialBar = { show: show, hide: hide };
}());
