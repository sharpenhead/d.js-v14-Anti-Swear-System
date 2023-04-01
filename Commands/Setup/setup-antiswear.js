const {
    SlashCommandBuilder,
    Client,
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    ChannelType
} = require("discord.js");
const antiswearSchema = require("../../Models/antiswear");
const antiswearLogSchema = require("../../Models/antiswearLogChannel");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-antiswear")
        .setDescription("Prevent members on the Discord server from swearing.")
        .addChannelOption(option =>
            option.setName("log-channel")
                .setDescription("*Choose the channel for logging violations.")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const guild = interaction.guild;
        const logChannel = interaction.options.getChannel("log-channel");

        await interaction.deferReply();

        let requireDB = await antiswearSchema.findOne({ _id: guild.id });
        let logSchema = await antiswearLogSchema.findOne({ Guild: guild.id });

        if (logSchema) {
            await antiswearLogSchema.create({
                Guild: guild.id,
                logChannel: logChannel.id
            })
        } else if (!logSchema) {
            await antiswearLogSchema.create({
                Guild: guild.id,
                logChannel: logChannel.id
            })
        }

        const sistema = requireDB?.logs === true ? "📗 Activated" : "📕 Disabled";

        const e2 = new EmbedBuilder()
            .setTitle(`🤬 Antiswear`)
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(mainColor)
            .setImage("https://cdn.discordapp.com/attachments/1045416602847432825/1073065383092826113/standard_2.gif")
            .setDescription(
                `Antiswear from ${guild.name}\n\nThe system is currently [\`${sistema}\`](https://discord.gg/kajdev).\nUse the button below to configure the server's antiswear status.\nCurrent log-channel: <#${logChannel.id}>.`
            )
            .setFooter({
                text: guild.name,
                iconURL: guild.iconURL({ dynamic: true }),
            })
            .setTimestamp(new Date());

        const b = new ButtonBuilder()
            .setLabel(`Activate`)
            .setCustomId(`true`)
            .setStyle(3)
            .setEmoji(`📗`);

        const b1 = new ButtonBuilder()
            .setLabel(`Disable`)
            .setCustomId(`false`)
            .setStyle(4)
            .setEmoji(`📕`);

        const ac = new ActionRowBuilder().addComponents(b, b1);

        const tf = await interaction.editReply({ embeds: [e2], components: [ac] });

        const coll = tf.createMessageComponentCollector();

        coll.on("collect", async (ds) => {
            if (ds.user.id !== interaction.user.id) return;

            if (ds.customId === `true`) {
                const e = new EmbedBuilder()
                    .setDescription(`📗 Antiswear system has been set to **Active**!`)
                    .setColor("Aqua");

                ds.update({ embeds: [e], components: [] });

                await antiswearSchema.findOneAndUpdate(
                    { _id: guild.id },
                    {
                        $set: { logs: true },
                    },
                    { upsert: true }
                );
            } else if (ds.customId === `false`) {
                const e = new EmbedBuilder()
                    .setDescription(`📕 Antiswear system has been set to **Disabled**!`)
                    .setColor("Red");

                ds.update({ embeds: [e], components: [] });

                await antiswearSchema.findOneAndUpdate(
                    { _id: guild.id },
                    {
                        $set: { logs: false },
                    },
                    { upsert: true }
                );
            }
        });
    },
};
