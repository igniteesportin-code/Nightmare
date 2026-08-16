// © Author: Rc
// https://discord.gg/t4Ef7QJeA



const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, SectionBuilder, SeparatorBuilder, SeparatorSpacingSize, StringSelectMenuBuilder, ActionRowBuilder, MessageFlags, ComponentType, ThumbnailBuilder, MediaGalleryBuilder, MediaGalleryItemBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const emojis = require('../../emojis.json');
const config = require('../../config');

const categories = {
    general: {
        name: 'General',
        description: 'Server utilities, lists, avatar & more',
        catEmoji: 'cat_general',
        commands: ['status', 'avatar', 'banner', 'servericon', 'membercount', 'urban', 'hash', 'snipe', 'editsnipe', 'purge', 'steal', 'remind', 'list boosters', 'list inrole', 'list emojis', 'list bots', 'list admins', 'list invoice', 'list mods', 'list early', 'list createpos', 'list roles']
    },
    information: {
        name: 'Information',
        description: 'Bot info, server stats & user details',
        catEmoji: 'cat_information',
        commands: ['userinfo', 'serverinfo', 'invite', 'users', 'botinfo', 'ping', 'avgping', 'uptime', 'help', 'stats permissions', 'stats rolecall', 'stats rolecount', 'stats roleinfo', 'stats roleperms', 'stats topic', 'stats channelinfo', 'stats emojiinfo', 'stats emojistats', 'stats emptyroles', 'stats firstjoins', 'stats joined', 'stats joinedatpos', 'stats joinpos', 'stats lastjoins', 'stats listchannels']
    },
    moderation: {
        name: 'Moderation',
        description: 'Ban, kick, mute, lock & more',
        catEmoji: 'cat_moderation',
        commands: ['kick', 'ban', 'softban', 'unban', 'slowmode', 'lock', 'unlock', 'tempban', 'mute', 'unmute', 'temprole', 'rolegive', 'roleremove', 'nick']
    },
    antinuke: {
        name: 'Antinuke',
        description: 'Protect your server from raids & nukes',
        catEmoji: 'cat_antinuke',
        commands: [
            'antinuke setup',
            'antinuke settings',
            'antinuke enable',
            'antinuke disable',
            'antinuke whitelist',
            'antinuke whitelist add',
            'antinuke whitelist remove',
            'antinuke whitelist list'
        ]
    },
    automod: {
        name: 'AutoMod',
        description: 'Automatic message moderation filters',
        catEmoji: 'cat_automod',
        commands: ['automod setup', 'automod settings', 'automod enable', 'automod disable', 'automod whitelist']
    },
    tickets: {
        name: 'Tickets',
        description: 'Support ticket system management',
        catEmoji: 'cat_tickets',
        commands: [
            'ticket setup', 'ticket panel', 'ticket addcategory', 'ticket removecategory',
            'ticket addrole', 'ticket removerole', 'ticket close', 'ticket open',
            'ticket delete', 'ticket add', 'ticket remove', 'ticket rename',
            'ticket claim', 'ticket transfer', 'ticket transcript', 'ticket reset'
        ]
    },
    welcome: {
        name: 'Welcome',
        description: 'Welcome & farewell message setup',
        catEmoji: 'cat_welcome',
        commands: ['welcome setup', 'welcome config', 'welcome test', 'welcome reset', 'farewell setup', 'farewell config', 'farewell test', 'farewell reset']
    },
    logging: {
        name: 'Logging',
        description: 'Server event logging configuration',
        catEmoji: 'cat_logging',
        commands: ['logging setup', 'logging config', 'logging reset']
    },
    fun: {
        name: 'Fun',
        description: 'Games, memes & fun commands',
        catEmoji: 'cat_fun',
        commands: [
            'howdumb', 'howgay', 'dare', 'truth', 'simprate',
            'pickup', 'rickroll', 'meme',
            'nitro', 'token', 'texttoemoji', 'wizz', 'hack', 'ship'
        ]
    },
    roleplay: {
        name: 'Roleplay',
        description: 'Hug, kiss, slap & expressive actions',
        catEmoji: 'cat_roleplay',
        commands: [
            'hug', 'kiss', 'lick', 'pat', 'slap', 'tickle', 'poke', 'deathstare',
            'dance', 'cry', 'laugh', 'smile', 'blush', 'wink', 'thumbsup', 'clap',
            'bow', 'salute', 'facepalm', 'shrug', 'sleep', 'eat', 'kill', 'run'
        ]
    },
    social: {
        name: 'Social',
        description: 'Social media, web search & crypto',
        catEmoji: 'cat_social',
        commands: ['youtube', 'github', 'wikipedia', 'news', 'google', 'ping', 'crypto balance', 'crypto price', 'crypto convert', 'crypto transaction', 'crypto news', 'crypto gainers', 'crypto losers']
    },
    utility: {
        name: 'Utility',
        description: 'Conversions, files, to-do & ignore',
        catEmoji: 'cat_utility',
        commands: ['lb', 'kg', 'ft', 'cm', 'hexdec', 'dechex', 'strbin', 'binstr', 'binint', 'intbin', 'encode', 'ascii85', 'rot13', 'base32', 'hex', 'todo add', 'todo list', 'todo remove', 'todo clear', 'dumpsettings', 'dumproles', 'dumpchannels', 'dumpvoicechannels', 'dumpcategories', 'dumpemotes', 'dumpmessages', 'dumphumans', 'dumpbots', 'dumpusers', 'dumpbans', 'dumpwarns', 'ignore command add', 'ignore command remove', 'ignore command show', 'ignore channel add', 'ignore channel remove', 'ignore channel show', 'ignore user add', 'ignore user remove', 'ignore user show', 'ignore bypass add', 'ignore bypass remove', 'ignore bypass show']
    },
};

const extraCategories = {
    animals: {
        name: 'Animals',
        description: 'Cute animal images & random facts',
        catEmoji: 'cat_animals',
        commands: ['cat', 'dog', 'fox', 'duck', 'panda', 'redpanda', 'bird', 'bunny', 'bear', 'pig', 'possum', 'sheep', 'snake', 'squirrel', 'animalfact']
    },
    giveaway: {
        name: 'Giveaway',
        description: 'Create, end & reroll giveaways',
        catEmoji: 'cat_giveaway',
        commands: ['giveaway start', 'giveaway end', 'giveaway reroll']
    },
    vanity: {
        name: 'Vanity Roles',
        description: 'Automatic vanity URL role rewards',
        catEmoji: 'cat_vanityroles',
        commands: ['vanity setup', 'vanity config', 'vanity reset']
    },
    feedback: {
        name: 'Feedback',
        description: 'Feedback panel & submission system',
        catEmoji: 'cat_feedback',
        commands: ['feedback setup', 'feedback panel', 'feedback config', 'feedback reset']
    },
    j2c: {
        name: 'Join2Create',
        description: 'Dynamic voice channel creation',
        catEmoji: 'cat_join2create',
        commands: ['j2c setup', 'j2c config', 'j2c reset']
    },
    automation: {
        name: 'Automation',
        description: 'Autoreact & autopost triggers',
        catEmoji: 'cat_automation',
        commands: ['autoreact add', 'autoreact remove', 'autoreact list', 'autoreact reset', 'autopost add', 'autopost remove', 'autopost reset']
    },
    profiles: {
        name: 'Profiles',
        description: 'User & bot profile customization',
        catEmoji: 'cat_profiles',
        commands: ['profile view', 'profile description', 'profile social', 'profile background', 'profile reset', 'profile card', 'serveravatar', 'serverbanner', 'serverbio', 'servername', 'serverresetprofile']
    },
    media: {
        name: 'Media',
        description: 'Media-only channels & profile pics',
        catEmoji: 'cat_media',
        commands: ['pfp anime', 'pfp male', 'pfp female', 'media setup', 'media remove', 'media config', 'media bypass add', 'media bypass remove', 'media bypass show']
    },
    misc: {
        name: 'Misc',
        description: 'Calculator, AFK, matrix & more',
        catEmoji: 'cat_misc',
        commands: ['calc', 'define', 'matrix', 'size', 'afk']
    },
    tracking: {
        name: 'Tracking',
        description: 'Message & invite leaderboards',
        catEmoji: 'cat_tracking',
        commands: ['leaderboard messages', 'leaderboard invites', 'messages', 'invites']
    },
    voice: {
        name: 'Voice',
        description: 'Voice channel moderation tools',
        catEmoji: 'cat_voice',
        commands: ['voice kick', 'voice kickall', 'voice mute', 'voice muteall', 'voice unmute', 'voice unmuteall', 'voice deafen', 'voice deafenall', 'voice undeafen', 'voice undeafenall', 'voice move', 'voice moveall', 'voice pull', 'voice pullall', 'voice lock', 'voice unlock', 'voice private', 'voice unprivate']
    },
    ai: {
        name: 'Artificial Intelligence',
        description: 'AI chat, image analysis & more',
        catEmoji: 'cat_ai',
        commands: ['ai enable', 'ai disable', 'ai analyse', 'ai ask']
    },
    reactionroles: {
        name: 'Reaction Roles',
        description: 'Self-assignable reaction role menus',
        catEmoji: 'cat_reactionroles',
        commands: ['reactionroles setup', 'reactionroles remove']
    },
};

const allCategories = { ...categories, ...extraCategories };

async function createHelpContainer(categoryKey = null, botAvatarURL, userAvatarURL, clientId, guildId = null, botUsername = 'Bot') {
    const container = new ContainerBuilder().setAccentColor(0x2C2F33);

    if (!categoryKey) {
        let guildPrefix = config.PREFIX;
        if (guildId) {
            const { GuildPrefix } = require('../../data/models');
            const customPrefix = await GuildPrefix.getPrefix(guildId);
            if (customPrefix) {
                guildPrefix = customPrefix;
            }
        }

        const allCats = { ...categories, ...extraCategories };
        const categoryList = Object.values(allCats).map(cat => {
            const emojiStr = cat.catEmoji && emojis[cat.catEmoji] ? emojis[cat.catEmoji] : '';
            return `> ${emojiStr} \`»\` **${cat.name}**`;
        }).join('\n');

        const headerSection = new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`### Hello, I'm ${botUsername}`)
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `- **Prefix for this server:** \`${guildPrefix}\`\n` +
                    `- **Set prefix with:** **/setprefix**\n` +
                    `- **Join [Support Server](${config.SUPPORT_SERVER}) For Help**`
                )
            );
        if (botAvatarURL) {
            headerSection.setThumbnailAccessory(new ThumbnailBuilder().setURL(botAvatarURL));
        }

        container
            .addSectionComponents(headerSection)
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(categoryList)
            )
            .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true));
    } else {
        const category = allCategories[categoryKey];
        if (!category) return container;

        container
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`# ${category.name}`)
            )
            .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true));

        if (categoryKey === 'music' && category.subcategories) {
            const commandsSection = new SectionBuilder();
            const subcategoryTexts = Object.entries(category.subcategories).map(([subKey, subcategory]) => {
                const commandList = subcategory.commands.map(cmd => `\`${cmd}\``).join(', ');
                return `**__${subcategory.name}__**\n${commandList}`;
            }).join('\n\n');
            commandsSection.addTextDisplayComponents(
                new TextDisplayBuilder().setContent(subcategoryTexts)
            );
            if (botAvatarURL) {
                commandsSection.setThumbnailAccessory(
                    new ThumbnailBuilder().setURL(botAvatarURL)
                );
            }
            container.addSectionComponents(commandsSection);
        } else {
            const commandsSection = new SectionBuilder();
            const commandList = category.commands.map(cmd => `\`${cmd}\``).join(', ');
            commandsSection.addTextDisplayComponents(
                new TextDisplayBuilder().setContent(commandList)
            );
            if (botAvatarURL) {
                commandsSection.setThumbnailAccessory(
                    new ThumbnailBuilder().setURL(botAvatarURL)
                );
            }
            container.addSectionComponents(commandsSection);
        }

        container.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true));
    }

    return container;
}

function parseEmoji(str) {
    if (!str) return undefined;
    const match = str.match(/<(a?):(\w+):(\d+)>/);
    if (!match) return undefined;
    return { animated: match[1] === 'a', name: match[2], id: match[3] };
}

function createSelectMenu(currentCategory = null) {
    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('help_category_select')
        .setPlaceholder('↘ Select a module to see');

    const homeEmoji = parseEmoji(emojis.cat_home);
    selectMenu.addOptions({
        label: 'Home',
        description: 'Return to the main help page',
        value: 'home',
        emoji: homeEmoji,
        default: currentCategory === 'home'
    });

    for (const [key, category] of Object.entries(categories)) {
        const option = {
            label: category.name,
            description: category.description || `${category.commands.length} commands`,
            value: key,
            default: currentCategory === key
        };
        if (category.catEmoji && emojis[category.catEmoji]) {
            option.emoji = parseEmoji(emojis[category.catEmoji]);
        }
        selectMenu.addOptions(option);
    }

    return new ActionRowBuilder().addComponents(selectMenu);
}

function createExtraSelectMenu(currentCategory = null) {
    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('help_extra_category_select')
        .setPlaceholder('↘ Select a category to see');

    for (const [key, category] of Object.entries(extraCategories)) {
        const option = {
            label: category.name,
            description: category.description || `${category.commands.length} commands`,
            value: key,
            default: currentCategory === key
        };
        if (category.catEmoji && emojis[category.catEmoji]) {
            option.emoji = parseEmoji(emojis[category.catEmoji]);
        }
        selectMenu.addOptions(option);
    }

    return new ActionRowBuilder().addComponents(selectMenu);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show all available commands')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category to view (e.g. general, automod, fun)')
                .setRequired(false)
        ),

    name: 'help',
    description: 'Show all available commands',
    aliases: ['h'],
    category: 'information',

    async execute(interactionOrMessage, args = []) {
        const isSlash = interactionOrMessage.isChatInputCommand?.();
        const { client } = interactionOrMessage;
        const user = isSlash ? interactionOrMessage.user : interactionOrMessage.author;
        const guildId = interactionOrMessage.guildId;

        const { sendHelp, registry } = require('../../lib/helpMenu');

        const rawArg = isSlash
            ? interactionOrMessage.options.getString('category')
            : (args[0] || null);

        if (rawArg) {
            const key = rawArg.toLowerCase();
            if (registry[key]) {
                return sendHelp(key, interactionOrMessage);
            }
            const matchedKey = Object.keys(allCategories).find(k =>
                allCategories[k].name.toLowerCase() === key
            );
            if (matchedKey && registry[matchedKey]) {
                return sendHelp(matchedKey, interactionOrMessage);
            }
        }

        const botAvatarURL = client.user.displayAvatarURL({ dynamic: true, size: 256 });
        const userAvatarURL = user.displayAvatarURL({ dynamic: true, size: 128 });
        const clientId = client.user.id;
        const botUsername = client.user.username;

        const container = await createHelpContainer(null, botAvatarURL, userAvatarURL, clientId, guildId, botUsername);
        const selectMenuRow = createSelectMenu();
        const extraSelectMenuRow = createExtraSelectMenu();

        container.addActionRowComponents(selectMenuRow);
        container.addActionRowComponents(extraSelectMenuRow);
        container
            .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true))
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent('-# Powered By CypherX Rc')
            );

        const reply = await interactionOrMessage.reply({
            components: [container],
            flags: MessageFlags.IsPersistent | MessageFlags.IsComponentsV2,
            fetchReply: true
        });

        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 240000
        });

        collector.on('collect', async (selectInteraction) => {
            if (selectInteraction.user.id !== user.id) {
                const errorContainer = new ContainerBuilder().setAccentColor(0x2C2F33)
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent('Only the command user can use this menu!')
                    );
                return selectInteraction.reply({
                    components: [errorContainer],
                    flags: MessageFlags.IsPersistent | MessageFlags.IsComponentsV2,
                    ephemeral: true
                });
            }

            const selectedCategory = selectInteraction.values[0];
            const isHome = selectedCategory === 'home';
            const newContainer = await createHelpContainer(isHome ? null : selectedCategory, botAvatarURL, userAvatarURL, clientId, guildId, botUsername);
            const newSelectMenu = createSelectMenu(isHome ? null : selectedCategory);
            const newExtraSelectMenu = createExtraSelectMenu(isHome ? null : selectedCategory);

            newContainer.addActionRowComponents(newSelectMenu);
            newContainer.addActionRowComponents(newExtraSelectMenu);
            if (isHome) {
                newContainer
                    .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true))
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent('-# Powered By CypherX Rc')
                    );
            }

            await selectInteraction.update({
                components: [newContainer],
                flags: MessageFlags.IsPersistent | MessageFlags.IsComponentsV2
            });
        });
    }
};

/**
 * Project: Melon
 * Author: itsfizys (Aegis)
 * Organization: AeroX Development
 * GitHub: https://github.com/itsfizys
 * License: Custom
 * © 2026 AeroX Development. All rights reserved.
 */
