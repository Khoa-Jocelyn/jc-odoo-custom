{
    'name': "Website Live Chat Advance",

    'summary': """
Advanced live chat features additional to the Odoo core's
""",

    'description': """
What it does?
=============

1. Internal operators can now trigger chat window open with visitors.
2. Multilingual live chat supports

Editions Supported
==================
1. Community Edition
2. Enterprise Edition

    """,

    'author': "Jocelyn",
    'category': 'Hidden',
    'version': '0.1.0',
    'depends': ['website_livechat'],
    'images': ['static/description/main_screenshot.png'],
    'installable': True,
    'application': False,
    'auto_install': True,
    'price': 99.9,
    'currency': 'EUR',
    'assets': {
        'web.assets_frontend': [
            'website_livechat_advance/static/src/js/im_livechat.js',
        ],
    },
    'license': 'OPL-1',
}
