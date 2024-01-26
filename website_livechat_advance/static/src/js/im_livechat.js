odoo.define('website_livechat_advance.livechat_request', function(require) {
	"use strict";

	var utils = require('web.utils');
	var LivechatButton = require('im_livechat.legacy.im_livechat.im_livechat').LivechatButton;


	LivechatButton.include({

		/**
		 * @override
		 * add channel based on visitor_uuid
		 */
		start: function() {
			this._super();
			this.call('bus_service', 'addChannel', utils.get_cookie('visitor_uuid'));
			this.call('bus_service', 'startPolling');
		},

		/**
		 * Chat request from backend that opens vistor chat box immediately without page refresing
		 *
		 * @private
		 * @param {Object} notification.payload
		 */
		_openlivechatImmediate: function(payload) {
			var self = this;
			if (payload.channel === utils.get_cookie('visitor_uuid')) {
				this._messages = [];
				utils.set_cookie('im_livechat_session', utils.unaccent(JSON.stringify(payload), true), 60 * 60 * 24);
				this.willStart().then(function() {
					if (self._history) {
						_.each(self._history.reverse(), self._addMessage.bind(self));
						if (!self._chatWindow) {
							self._openChat();
						}
					}
				});
			};

		},

		/**
		 * Override to open website visitor chatbox without page refresing
		 *
		 * @override
		 * @param {Object} notification
		 * @param {Object} notification.payload
		 * @param {string} notification.type
		 */
		_handleNotification: function({ payload, type }) {
            // only stop handling if this._livechat is null
            // and type is 'im_livechat.history_command / mail.channel.partner/typing_status / mail.channel/new_message'
            // because with other types in other modules, maybe work with this._livechat is null
            if (!this._livechat && (
                type === 'im_livechat.history_command'
                || type === 'mail.channel.partner/typing_status'
                || type === 'mail.channel/new_message')){
                return;
            }
			var self = this;
			if (type == 'chat_request') {
				self._openlivechatImmediate(payload);
			}
			this._super({ payload, type });
		},
	});

	return {
		LivechatButton: LivechatButton,
	};

});
