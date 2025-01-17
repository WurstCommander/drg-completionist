import type { Miner } from 'data/miner';
import type { MinerWeapon } from 'data/weapons';
import type { Overclock } from 'types/overclock';
import AutocannonOverclocks from './weapons/autocannon';
import BurstFireGunOverclocks from './weapons/burstfiregun';
import MinigunOverclocks from './weapons/minigun';
import RevolverOverclocks from './weapons/revolver';

const GunnerOverclocks: Record<MinerWeapon<Miner.Gunner>, Overclock[]> = {
  '"Lead Storm" Powered Minigun': MinigunOverclocks,
  '"Thunderhead" Heavy Autocannon': AutocannonOverclocks,
  '"Bulldog" Heavy Revolver': RevolverOverclocks,
  'BRT7 Burst Fire Gun': BurstFireGunOverclocks,
};

export default GunnerOverclocks;
