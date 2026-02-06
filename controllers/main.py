# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request

class XpanelERPController(http.Controller):
    @http.route('/', type='http', auth="public", website=True, sitemap=False)
    def index(self, **kw):
        """
        Redirects the root URL to /web (Apps Grid).
        This replaces the default website homepage with the Odoo backend interface.
        """
        return request.redirect('/web')
