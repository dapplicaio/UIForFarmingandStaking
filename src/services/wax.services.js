import { GAME_CONTRACT } from '../constants/wax.constants';
import {
  fetchRows, signTransaction,
} from '../helpers';

// Get resources
export const getResouces = async ({ activeUser }) => {
    const { rows } = await fetchRows({
      contract: GAME_CONTRACT,
      scope: activeUser.accountName,
      table: 'resources',
      limit: 100,
    });
  
   return rows;
};

// Claim
export const claimRes = async ({ activeUser }) => {
    return await signTransaction({
      activeUser,
      account: GAME_CONTRACT,
      action: 'claim',
      data: {
        owner: activeUser.accountName,
        farmingitem: 1,
      },
    });
  };

  // Stake farming item
export const stakeFarmingTool = async ({ activeUser, selectItem }) => {
    return await signTransaction({
        activeUser,
        account: GAME_CONTRACT,
        action: 'transfer',
        data: {
            from: activeUser.accountName,
            to: GAME_CONTRACT,
            asset_ids: [selectItem],
            memo: `stake farming item`
        }
    });
};

// Stake item
export const stakeTool = async ({ activeUser, selectItem, wpId = 1 }) => {
    return await signTransaction({
        activeUser,
        account: 'atomicassets',
        action: 'transfer',
        data: {
            from: activeUser.accountName,
            to: GAME_CONTRACT,
            asset_ids: selectItem,
            memo: `stake items:${wpId}`
        }
    });
};
