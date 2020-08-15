import * as settings from './settings.js';
import * as LI_module from './lingering-injuries.js';
import * as MD_module from './massive-damage.js';
import * as TH_module from './token_hp.js';

let debug = true;
let log = (...args) => console.log("Advanced Combat Options | ", ...args);

Hooks.on('init', ()=>{
  settings.registerSettings();
});



Hooks.on('ready', () => {
  game.socket.on('module.advanced-combat-options', async (data) => {
    if(data?.name === "LI" && game.settings.get('advanced-combat-options','LI-SETTING'))
    {
      LI_module.recieveData(data?.data);
    }
    if(data?.name === "MD" && game.settings.get('advanced-combat-options','LI-SETTING'))
    {
      MD_module.recieveData(data?.data);
    }
  });
});

Hooks.on('preCreateToken', (scene,token,options,id) => {
  if(debug) log("Pre Create Token | ", scene,token,options,id);

  TH_module.onCreate(scene,token);
});

Hooks.on('preUpdateActor', (actor, updateData, difference, id)=>{
  
  if(debug) log("Pre Update Actor | ",actor,updateData,difference,id);

  //Lingering Injuries
  if(game.settings.get('advanced-combat-options','LI-SETTING'))
  {
    LI_module.onChange_Actor(actor,updateData);
  }

  //Massive Damage
  if(game.settings.get('advanced-combat-options','MD-SETTING'))
  {
    MD_module.onChange_Actor(actor,updateData);
  }
});

Hooks.on('preUpdateToken', (scene,token,updateData,difference, id)=>{
  if(debug) log("Pre Update Token | ",scene,token,updateData,difference,id);

  //Lingering Injuries
  if(game.settings.get('advanced-combat-options','LI-SETTING') && updateData?.actorData?.data?.attributes?.hp?.value)
  {
    LI_module.onChange_Token(token.actorData,updateData);
  }

  //Massive Damage
  if(game.settings.get('advanced-combat-options','MD-SETTING') && updateData?.actorData?.data?.attributes?.hp?.value)
  {
    MD_module.onChange_Token(token.actorData,updateData);
  }
});