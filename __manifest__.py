# -*- coding: utf-8 -*-
{
    'name': 'XpanelERP PWA',
    'version': '1.0.0',
    'category': 'Web',
    'summary': 'Progressive Web App wrapper and UI customization for Odoo',
    'description': """
        XpanelERP PWA Module
        ====================
        - Makes Odoo installable as a PWA
        - Custom loading/splash screen
        - Sticky footer navigation bar
        - Black & white solid UI
        - Mobile and desktop support
    """,
    'author': 'XpanelERP',
    'website': 'https://xpanelerp.com',
    'depends': ['web', 'hr_timesheet', 'website'],
    'data': [
        'views/templates.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'xpanel_erp/static/src/css/xpanel_footer.css',
            'xpanel_erp/static/src/css/loading.css',
            'xpanel_erp/static/src/js/xpanel_footer.js',
        ],
        'web.assets_frontend': [
            'xpanel_erp/static/src/css/xpanel_footer.css',
            'xpanel_erp/static/src/css/loading.css',
            'xpanel_erp/static/src/js/xpanel_footer.js',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
