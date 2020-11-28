//priority: 975
events.listen('recipes', function (event) {
    // pedestals_dust_smelting(event);

    materialsToUnify.forEach(function (material) {
        enigmatica_ore_deposit_processing(event, material);
        immersiveengineering_gem_ore_processing(event, material);
        //occultism_ore_ingot_crushing(event, material);
        immersiveengineering_hammer_crafting_plates(event, material);
    });
});

function pedestals_dust_smelting(event) {
    var pedestal_dusts = ['pedestals:dustsilver', 'pedestals:dustaluminum', 'pedestals:dustnickel'];

    pedestal_dusts.forEach(function (dust) {
        var ingotTag = ingredient.of('#forge:ingots/' + dust.replace('pedestals:dust', ''));

        event.recipes.minecraft.smelting(ingotTag, pedestal_dusts).xp(0.1);
        event.recipes.minecraft.blasting(ingotTag, pedestal_dusts).xp(0.1);
    });
}

function immersiveengineering_gem_ore_processing(event, material) {
    var gemTag = ingredient.of('#forge:gems/' + material);
    var gem = getPreferredItemInTag(gemTag).id;

    var oreTag = ingredient.of('#forge:ores/' + material);
    var ore = getPreferredItemInTag(oreTag).id;

    var dustTag = ingredient.of('#forge:dusts/' + material);
    var dust = getPreferredItemInTag(dustTag).id;

    if (gem == air || dust == air) {
        return;
    }

    event.recipes.immersiveengineering.crusher({
        secondaries: [],
        result: {
            item: dust
        },
        input: {
            tag: 'forge:gems/' + material
        },
        energy: 2000
    });

    if (ore == air) {
        return;
    }
}

function enigmatica_ore_deposit_processing(event, material) {
    var oreDepositTag = ingredient.of('#forge:ore_deposits/' + material);
    var oreDeposit = oreDepositTag.first.id;

    var nuggetTag = ingredient.of('#forge:nuggets/' + material);
    var nugget = getPreferredItemInTag(nuggetTag).id;

    var dustTag = ingredient.of('#forge:dusts/' + material);
    var dust = getPreferredItemInTag(dustTag).id;

    if (oreDeposit == air || dust == air) {
        return;
    }

    if (nuggetTag.first.id == air) {
        event.recipes.minecraft.smelting(dust, oreDepositTag).xp(1.0);
        event.recipes.minecraft.blasting(dust, oreDepositTag).xp(1.0);
    } else {
        event.recipes.minecraft.smelting(nugget, oreDepositTag).xp(1.0);
        event.recipes.minecraft.blasting(nugget, oreDepositTag).xp(1.0);
    }

    event.recipes.mekanism.enriching({
        input: {
            ingredient: { tag: 'forge:ore_deposits/' + material }
        },
        output: { item: dust, count: 1 }
    });

    // event.recipes.create.crushing({
    //     ingredients: [
    //         {
    //             tag: 'forge:ore_deposits/' + material,
    //             count: 1
    //         }
    //     ],
    //     results: [
    //         {
    //             item: dust,
    //             count: 1
    //         },
    //         {
    //             item: dust,
    //             chance: 0.1,
    //             count: 1
    //         },
    //         {
    //             item: 'minecraft:dirt',
    //             chance: 0.5,
    //             count: 1
    //         }
    //     ],
    //     processingTime: 500
    // });

    event.recipes.immersiveengineering.crusher({
        secondaries: [],
        result: {
            item: dust
        },
        input: {
            tag: 'forge:ore_deposits/' + material
        },
        energy: 2000
    });

    // event.recipes.occultism.crushing({
    //     ingredient: {
    //         tag: 'forge:ore_deposits/' + material
    //     },

    //     result: {
    //         item: dust,
    //         count: 1
    //     },
    //     crushing_time: 200
    // });
}

function occultism_ore_ingot_crushing(event, material, blacklistedMaterials) {
    if (!blacklistedMaterials) {
        blacklistedMaterials = ['redstone', 'lapis', 'emerald', 'diamond', 'quartz', 'coal'];
    }

    for (var i = 0; i < blacklistedMaterials.length; i++) {
        if (blacklistedMaterials[i] == material) {
            return;
        }
    }

    var oreDepositTag = ingredient.of('#forge:ore_deposits/' + material);
    var oreDeposit = getPreferredItemInTag(oreDepositTag).id;

    var dustTag = ingredient.of('#forge:dusts/' + material);
    var dust = getPreferredItemInTag(dustTag).id;

    var ingotTag = ingredient.of('#forge:ingots/' + material);
    var ingot = getPreferredItemInTag(ingotTag).id;

    if (oreDeposit == air || dust == air) {
        return;
    }

    event.recipes.occultism.crushing({
        ingredient: {
            tag: 'forge:ores/' + material
        },

        result: {
            item: dust,
            count: 2
        },
        crushing_time: 200
    });

    if (ingot == air) {
        return;
    }

    event.recipes.occultism.crushing({
        ingredient: {
            tag: 'forge:ingots/' + material
        },

        result: {
            item: dust,
            count: 1
        },
        crushing_time: 200
    });
}

function immersiveengineering_hammer_crafting_plates(event, material) {
    var hammer = 'immersiveengineering:hammer';
    var ingotTag = ingredient.of('#forge:ingots/' + material);
    var ingot = getPreferredItemInTag(ingotTag).id;

    var gemTag = ingredient.of('#forge:gems/' + material);
    var gem = getPreferredItemInTag(gemTag).id;

    var plateTag = ingredient.of('#forge:plates/' + material);
    var plate = getPreferredItemInTag(plateTag).id;

    if (plate == air) {
        return;
    }

    if (ingot != air) {
        event.shapeless(plate, [hammer, ingot]);
        event.remove({ id: 'immersiveengineering:crafting/plate_' + material + '_hammering' });
        event.recipes.immersiveengineering.metal_press({
            mold: {
                item: 'immersiveengineering:mold_plate'
            },
            result: {
                tag: 'forge:plates/' + material
            },
            input: {
                tag: 'forge:ingots/' + material
            },
            energy: 2400
        });
        // JAOPCA added thermal press ingot compat
        // event.recipes.thermal.press({
        //     type: 'thermal:press',
        //     ingredient: {
        //         tag: 'forge:ingots/' + material
        //     },
        //     result: [
        //         {
        //             item: plate
        //         }
        //     ]
        // });
    }

    if (gem != air) {
        var storageBlockTag = ingredient.of('#forge:storage_blocks/' + material);
        var storageBlock = getPreferredItemInTag(storageBlockTag).id;
        var input = gem;
        var inputTag = 'forge:gems/' + material;
        if (storageBlock != null) {
            input = storageBlock;
            inputTag = 'forge:storage_blocks/' + material;
        }

        event.shapeless(plate, [hammer, input]);
        event.recipes.immersiveengineering.metal_press({
            mold: {
                item: 'immersiveengineering:mold_plate'
            },
            result: {
                tag: 'forge:plates/' + material
            },
            input: {
                tag: inputTag
            },
            energy: 2400
        });
        event.recipes.thermal.press({
            ingredient: {
                tag: inputTag
            },
            result: [
                {
                    item: plate
                }
            ]
        });
    }
}
