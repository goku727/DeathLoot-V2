//priority: 997

events.listen("recipes", function (e) {
    function unifyMetal(name, ingotItem, dustItem, blockItem, nuggetItem) {
        e.replaceOutput("#forge:ingots/" + name, ingotItem);
        e.replaceOutput("#forge:dusts/" + name, dustItem);
        e.replaceOutput("#forge:nuggets/" + name, nuggetItem);
        e.replaceOutput("#forge:storage_blocks/" + name, blockItem);

        // Remove smelting recipes for metals
        e.remove({
            input: ["#forge:ores/" + name, "#forge:dusts/" + name],
            output: "#forge:ingots/" + name,
            type: "minecraft:smelting",
        });

        // Remove smelting in minecraft blast furnace recipes for metals
        e.remove({
            input: ["#forge:ores/" + name, "#forge:dusts/" + name],
            output: "#forge:ingots/" + name,
            type: "minecraft:blasting",
        });
        // Remove enriching recipes for metals
        e.remove({
            input: "#forge:ores/" + name,
            output: "#forge:dusts/" + name,
            type: "mekanism:enriching",
        });
        // Remove immersive crusher recipes for metals
        e.remove({
            input: "#forge:ores/" + name,
            type: "immersiveengineering:crusher",
        });
        e.remove({
            input: "#forge:ingots/" + name,
            type: "immersiveengineering:crusher",
        });

        //Remove induction smelter recipes
        e.remove({
            output: "#forge:ores/" + name,
            type: "thermal",
        });

        e.recipes.minecraft
            .smelting(ingotItem, "#forge:dusts/" + name)
            .xp(0.5)
            .id("kubejs:minecraft/smelting/dusts/" + name);
        e.recipes.minecraft
            .blasting(ingotItem, "#forge:dusts/" + name)
            .xp(0.5)
            .id("kubejs:minecraft/blasting/dusts/" + name);
        e.remove({
            id: "appliedenergistics2:grinder/" + name + "_dust_ingot",
        });
        e.recipes.appliedenergistics2
            .grinder({
                input: {
                    tag: "forge:ingots/" + name,
                },
                result: {
                    primary: {
                        item: dustItem,
                        count: 1,
                    },
                },
                turns: 8,
            })
            .id("kubejs:appliedenergistics2/grinder/ingot/" + name);
        e.recipes.immersiveengineering
            .crusher({
                secondaries: [],
                result: {
                    base_ingredient: {
                        item: dustItem,
                    },
                },
                input: {
                    tag: "forge:ingots/" + name,
                },
                energy: 3000,
            })
            .id("kubejs:immersiveengineering/crusher/ingot/" + name);
        //If unifiable item doesn't have an ore, add it below
        if (!ingredient.of("#forge:ores/" + name).empty) {
            e.recipes.minecraft
                .smelting(ingotItem, "#forge:ores/" + name)
                .xp(1)
                .id("kubejs:minecraft/smelting/ores/" + name);
            e.recipes.minecraft
                .blasting(ingotItem, "#forge:ores/" + name)
                .xp(1)
                .id("kubejs:minecraft/blasting/ores/" + name);
            e.recipes.mekanism
                .enriching(item.of(dustItem, 2), "#forge:ores/" + name)
                .id("kubejs:mekanism/enriching/ores/" + name);
            e.remove({
                id: "engineerstools:crushing/" + name + "_grit_crushing_recipe",
            });
            e.recipes.engineerstools
                .crafting_extended_shapeless({
                    group: "grit",
                    ingredients: [
                        {
                            tag: "forge:ores/" + name,
                        },
                        {
                            item: "engineerstools:crushing_hammer",
                        },
                    ],
                    result: {
                        item: dustItem,
                        count: 2,
                    },
                    aspects: {
                        tool: "engineerstools:crushing_hammer",
                        tool_damage: 25,
                    },
                })
                .id("kubejs:engineerstools/crushing_hammer/ores/" + name);
        }
        e.recipes.immersiveengineering
            .crusher({
                secondaries: [],
                result: {
                    count: 2,
                    base_ingredient: {
                        item: dustItem,
                    },
                },
                input: {
                    tag: "forge:ores/" + name,
                },
                energy: 3000,
            })
            .id("kubejs:immersiveengineering/crusher/ore/" + name);
        e.remove({
            id: "appliedenergistics2:grinder/" + name + "_dust_ore",
        });
        e.recipes.appliedenergistics2
            .grinder({
                input: {
                    tag: "forge:ores/" + name,
                },
                result: {
                    primary: {
                        item: dustItem,
                        count: 2,
                    },
                },
                turns: 8,
            })
            .id("kubejs:appliedenergistics2/grinder/ores/" + name);

        e.shaped();
    }

    unifyMetal(
        "iron",
        "minecraft:iron_ingot",
        "alltheores:iron_dust",
        "minecraft:iron_block",
        "minecraft:iron_nugget"
    );
    unifyMetal(
        "gold",
        "minecraft:gold_ingot",
        "alltheores:gold_dust",
        "minecraft:gold_block",
        "minecraft:gold_nugget"
    );
    unifyMetal(
        "aluminum",
        "alltheores:aluminum_ingot",
        "alltheores:aluminum_dust",
        "alltheores:aluminum_block",
        "alltheores:aluminum_nugget"
    );
    unifyMetal(
        "uranium",
        "alltheores:uranium_ingot",
        "alltheores:uranium_dust",
        "alltheores:uranium_block",
        "alltheores:uranium_nugget"
    );
    unifyMetal(
        "copper",
        "alltheores:copper_ingot",
        "alltheores:copper_dust",
        "alltheores:copper_block",
        "alltheores:copper_nugget"
    );
    unifyMetal(
        "tin",
        "alltheores:tin_ingot",
        "alltheores:tin_dust",
        "alltheores:tin_block",
        "alltheores:tin_nugget"
    );
    unifyMetal(
        "silver",
        "alltheores:silver_ingot",
        "alltheores:silver_dust",
        "alltheores:silver_block",
        "alltheores:silver_nugget"
    );
    unifyMetal(
        "lead",
        "alltheores:lead_ingot",
        "alltheores:lead_dust",
        "alltheores:lead_block",
        "alltheores:lead_nugget"
    );
    unifyMetal(
        "nickel",
        "alltheores:nickel_ingot",
        "alltheores:nickel_dust",
        "alltheores:nickel_block",
        "alltheores:nickel_nugget"
    );
    unifyMetal(
        "zinc",
        "alltheores:zinc_ingot",
        "alltheores:zinc_dust",
        "alltheores:zinc_block",
        "alltheores:zinc_nugget"
    );
    unifyMetal(
        "platinum",
        "alltheores:platinum_ingot",
        "alltheores:platinum_dust",
        "alltheores:platinum_block",
        "alltheores:platinum_nugget"
    );
    unifyMetal(
        "osmium",
        "alltheores:osmium_ingot",
        "alltheores:osmium_dust",
        "alltheores:osmium_block",
        "alltheores:osmium_nugget"
    );
    unifyMetal(
        "steel",
        "mekanism:ingot_steel",
        "mekanism:dust_steel",
        "mekanism:block_steel",
        "mekanism:nugget_steel"
    );
    unifyMetal(
        "bronze",
        "thermal:bronze_ingot",
        "thermal:bronze_dust",
        "thermal:bronze_block",
        "thermal:bronze_nugget"
    );
    unifyMetal(
        "constantan",
        "thermal:constantan_ingot",
        "thermal:constantan_dust",
        "thermal:constantan_block",
        "thermal:constantan_nugget"
    );
    unifyMetal(
        "electrum",
        "thermal:electrum_ingot",
        "thermal:electrum_dust",
        "thermal:electrum_block",
        "thermal:electrum_nugget"
    );
});
