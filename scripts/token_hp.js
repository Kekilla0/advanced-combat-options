let debug = true;
let log = (...args) => console.log("Advanced Combat Options | Token HP | ", ...args);

export async function onCreate(scene, data)
{
  let actor = game.actors.get(data.actorId);

  if(data.actorLink)
  {
    return data;
  }
    
  //figure out resizing later

  if(game.settings.get('advanced-combat-options','TH-SETTING'))
  {
    let formula = actor.data.data.attributes.hp.formula;
    if(formula)
    {
      let hp_roll = new Roll(formula).roll();

      if(debug) log("Formula Available | value rolled.", hp_roll);

      setProperty(data, "actorData.data.attributes.hp.value", hp_roll.total);
      setProperty(data, "actorData.data.attributes.hp.max", hp_roll.total);
    }else{
      if(debug) log("No formula Available | setting max.");
      setProperty(data, "actorData.data.attributes.hp.value", actor.data.data.attributes.hp.value);
      setProperty(data, "actorData.data.attributes.hp.max", actor.data.data.attributes.hp.max);
    }
  }else{
    if(debug) log("Setting Unset | setting max.");
    setProperty(data, "actorData.data.attributes.hp.value", actor.data.data.attributes.hp.value);
    setProperty(data, "actorData.data.attributes.hp.max", actor.data.data.attributes.hp.max);
  }

  if(debug) log("Ending Data | ", data);
  return data; 
}