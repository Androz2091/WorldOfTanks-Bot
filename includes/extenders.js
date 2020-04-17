require("date-and-time/locale/fr");

const { Guild, Message } = require("discord.js");
const config = require("../config");

Guild.prototype.translate = function(key, args) {
    const language = this.client.translations.get(this.language);
    if (!language) throw "Message: Invalid language set in data.";
    return language(key, args);
};

Message.prototype.translate = function(key, args) {
    const language = this.client.translations.get(
        this.guild ? this.guild.language : "en-US"
    );
    if (!language) throw "Message: Invalid language set in data.";
    return language(key, args);
};

// Translate and send the message with an error emoji
Message.prototype.error = function(key, args, edit = false, embed = false) {
    if (
        embed &&
        this.channel.permissionsFor(this.guild.me).has("EMBED_LINKS")
    ) {
        const embed = {
            color: "#FF0000",
            description: this.translate(key, args)
        };
        return edit ? this.edit({ embed }) : this.channel.send({ embed });
    } else {
        const updatedContent = `${config.emojis.error} | ${this.translate(
            key,
            args
        )}`;
        return edit
            ? this.edit(updatedContent)
            : this.channel.send(updatedContent);
    }
};

// Translate and send the message with a success emoji
Message.prototype.success = function(key, args, edit = false, embed = false) {
    if (
        embed &&
        this.channel.permissionsFor(this.guild.me).has("EMBED_LINKS")
    ) {
        const embed = {
            color: "#32CD32",
            description: this.translate(key, args)
        };
        return edit ? this.edit({ embed }) : this.channel.send({ embed });
    } else {
        const updatedContent = `${config.emojis.success} | ${this.translate(
            key,
            args
        )}`;
        return edit
            ? this.edit(updatedContent)
            : this.channel.send(updatedContent);
    }
};

// Translate and send the message
Message.prototype.sendT = function(
    key,
    args,
    edit = false,
    embed = false,
    emoji = null
) {
    const prefix = emoji ? `${config.emojis[emoji]} | ` : "";
    if (
        embed &&
        this.channel.permissionsFor(this.guild.me).has("EMBED_LINKS")
    ) {
        const embed = {
            color: config.color,
            description: prefix + this.translate(key, args)
        };
        return edit ? this.edit({ embed }) : this.channel.send({ embed });
    } else {
        return edit
            ? this.edit(prefix + this.translate(key, args))
            : this.channel.send(prefix + this.translate(key, args));
    }
};
