/** @odoo-module **/

(function () {
    'use strict';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooter);
    } else {
        initFooter();
    }

    function initFooter() {
        setTimeout(function () {
            setupFooterButtons();
            // If we just arrived from the website with the #xpanel_grid hash, open the menu
            if (window.location.hash === '#xpanel_grid' || window.location.hash === '#menu_id=root') {
                const menuToggle = document.querySelector('.o_menu_toggle, .o_navbar_apps_menu, .o_app_menu_toggle');
                if (menuToggle) menuToggle.click();
                // Clean the hash without reload
                history.replaceState(null, null, ' ');
            }
        }, 1500);
    }

    function setupFooterButtons() {
        const footer = document.getElementById('xpanel_footer');
        if (!footer) {
            setTimeout(setupFooterButtons, 500);
            return;
        }

        const buttons = footer.querySelectorAll('.xpanel-footer-btn');
        buttons.forEach(button => {
            const newBtn = button.cloneNode(true);
            button.parentNode.replaceChild(newBtn, button);

            newBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const action = this.getAttribute('data-action');
                handleFooterAction(action);
            });
        });
    }

    function handleFooterAction(action) {
        switch (action) {
            case 'console':
                alert("This feature will be available soon. You will be notified once it is ready.");
                // const menuToggle = document.querySelector('.o_grid_apps_menu__button');
                // if (menuToggle) {
                //     menuToggle.click();
                // } else {
                //     window.location.href = '/web';
                // }
                break;
            case 'worklogs':
                window.location.href = '/web?action=hr_timesheet.act_hr_timesheet_line';
                break;
            case 'assistant':
                alert("This feature will be available soon. You will be notified once it is ready.");
                break;
            case 'analytics':
                window.location.href = '/odoo/dashboards';
                break;
            case 'back':
                navigateBack();
                break;
        }
    }

    function navigateBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/web';
        }
    }

    if (window.odoo) {
        const originalPushState = history.pushState;
        history.pushState = function () {
            originalPushState.apply(history, arguments);
            setTimeout(setupFooterButtons, 300);
        };

        const originalReplaceState = history.replaceState;
        history.replaceState = function () {
            originalReplaceState.apply(history, arguments);
            setTimeout(setupFooterButtons, 300);
        };
    }

    window.addEventListener('popstate', function () {
        setTimeout(setupFooterButtons, 300);
    });

    window.addEventListener('load', function () {
        setTimeout(setupFooterButtons, 1500);
        setupNotificationBridge();
    });

    function setupNotificationBridge() {
        if (!('Notification' in window)) return;

        // Monitor for Odoo's toast notifications to mirror them to system notifications
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (node) {
                    if (node.classList && (node.classList.contains('o_notification') || node.classList.contains('o_toast'))) {
                        tryShowSystemNotification(node);
                    }
                });
            });
        });

        const target = document.body;
        observer.observe(target, { childList: true, subtree: true });
    }

    function tryShowSystemNotification(node) {
        if (Notification.permission !== 'granted') return;

        // Don't show if the user is actively Looking at the app
        if (document.visibilityState === 'visible' && document.hasFocus()) return;

        const title = node.querySelector('.o_notification_title')?.innerText || 'XpanelERP';
        const body = node.querySelector('.o_notification_content')?.innerText ||
            node.querySelector('.o_toast_body')?.innerText ||
            'New message received';

        if (window.navigator && navigator.serviceWorker && navigator.serviceWorker.controller) {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, {
                    body: body,
                    icon: '/xpanel_erp/static/src/img/xpanelerp.png',
                    tag: 'xpanelerp-notification',
                    renotify: true
                });
            });
        } else {
            new Notification(title, { body: body, icon: '/xpanel_erp/static/src/img/xpanelerp.png' });
        }
    }
})();