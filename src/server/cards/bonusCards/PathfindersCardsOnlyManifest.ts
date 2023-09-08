
import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';
import { AdvancedPowerGrid } from '../pathfinders/AdvancedPowerGrid';
import { AgroDrones } from '../pathfinders/AgroDrones';
import { Anthozoa } from '../pathfinders/Anthozoa';
import { AsteroidResources } from '../pathfinders/AsteroidResources';
import { BreedingFarms } from '../pathfinders/BreedingFarms';
import { ControlledBloom } from '../pathfinders/ControlledBloom';
import { CoordinatedRaid } from '../pathfinders/CoordinatedRaid';
import { Cyanobacteria } from '../pathfinders/Cyanobacteria';
import { DesignedOrganisms } from '../pathfinders/DesignedOrganisms';
import { DustStorm } from '../pathfinders/DustStorm';
import { FlatMarsTheory } from '../pathfinders/FlatMarsTheory';
import { GeologicalExpedition } from '../pathfinders/GeologicalExpedition';
import { HuygensObservatory } from '../pathfinders/HuygensObservatory';
import { LastResortIngenuity } from '../pathfinders/LastResortIngenuity';
import { MartianDustProcessingPlant } from '../pathfinders/MartianDustProcessingPlant';
import { MicrobiologyPatents } from '../pathfinders/MicrobiologyPatents';
import { MuseumofEarlyColonisation } from '../pathfinders/MuseumofEarlyColonisation';
import { OrbitalLaboratories } from '../pathfinders/OrbitalLaboratories';
import { OzoneGenerators } from '../pathfinders/OzoneGenerators';
import { Pollinators } from '../pathfinders/Pollinators';
import { PowerPlant } from '../pathfinders/PowerPlant';
import { PrefabricationofHumanHabitats } from '../pathfinders/PrefabricationofHumanHabitats';
import { RareEarthElements } from '../pathfinders/RareEarthElements';
import { RichDeposits } from '../pathfinders/RichDeposits';
import { SecretLabs } from '../pathfinders/SecretLabs';
import { SpaceRelay } from '../pathfinders/SpaceRelay';
import { SpecializedSettlement } from '../pathfinders/SpecializedSettlement';

export const PATHFINDERS_CARDS_ONLY_MANIFEST = new ModuleManifest({
  module: 'pathfindersCardsOnly',
  projectCards: {
    //Pathfinders
    [CardName.ADVANCED_POWER_GRID]: {Factory: AdvancedPowerGrid},
    [CardName.AGRO_DRONES]: {Factory: AgroDrones},
    [CardName.ANTHOZOA]: {Factory: Anthozoa},
    [CardName.ASTEROID_RESOURCES]: {Factory: AsteroidResources},
    [CardName.BREEDING_FARMS]: {Factory: BreedingFarms},
    [CardName.CONTROLLED_BLOOM]: {Factory: ControlledBloom},
    [CardName.COORDINATED_RAID]: {Factory: CoordinatedRaid},
    [CardName.CYANOBACTERIA]: {Factory: Cyanobacteria},
    [CardName.DESIGNED_ORGANISMS]: {Factory: DesignedOrganisms},
    [CardName.DUST_STORM]: {Factory: DustStorm},
    [CardName.FLAT_MARS_THEORY]: {Factory: FlatMarsTheory},
    [CardName.GEOLOGICAL_EXPEDITION]: {Factory: GeologicalExpedition},
    [CardName.HUYGENS_OBSERVATORY]: {Factory: HuygensObservatory},
    [CardName.LAST_RESORT_INGENUITY]: {Factory: LastResortIngenuity},
    [CardName.MARTIAN_DUST_PROCESSING_PLANT]: {Factory: MartianDustProcessingPlant},
    [CardName.MICROBIOLOGY_PATENTS]: {Factory: MicrobiologyPatents},
    [CardName.MUSEUM_OF_EARLY_COLONISATION]: {Factory: MuseumofEarlyColonisation},
    [CardName.ORBITAL_LABORATORIES]: {Factory: OrbitalLaboratories},
    [CardName.OZONE_GENERATORS]: {Factory: OzoneGenerators},
    [CardName.POLLINATORS]: {Factory: Pollinators},
    [CardName.POWER_PLANT_PATHFINDERS]: {Factory: PowerPlant},
    [CardName.PREFABRICATION_OF_HUMAN_HABITATS]: {Factory: PrefabricationofHumanHabitats},
    [CardName.RARE_EARTH_ELEMENTS]: {Factory: RareEarthElements},
    [CardName.RICH_DEPOSITS]: {Factory: RichDeposits},
    [CardName.SECRET_LABS]: {Factory: SecretLabs},
    [CardName.SPACE_RELAY]: {Factory: SpaceRelay},
    [CardName.SPECIALIZED_SETTLEMENT]: {Factory: SpecializedSettlement},
  }
});
