import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check



export type guest = {
  name: string,
  guestOf: string, 
  dietRestriction: string,
  additionalGuestNumber: number,
  additonalGuestName: string,
  additionalGuestDiteryRestriction: string,
  isFamily: boolean
};


const GuestsServerMap: Map<string, guest> = new Map();


/**
 * adds guest to the server map 
 * @param res the response
 */
export const addGuest = (req: SafeRequest, res: SafeResponse): void  => {
  const name = req.body.name;
  if (typeof name !== 'string') {
    res.status(400).send("missing 'name' parameter");
    return;
  }

  const guestOf = req.body.guestOf;
  if (typeof guestOf != 'string') {
    res.status(400).send("missing 'guestOf' parameter");
    return;
  }
  
  const dietRestriction = req.body.dietRestriction
  if (typeof dietRestriction != 'string') {
    res.status(400).send("missing 'dietRestriction' parameter");
    return
  }

  const additionalGuestNumber = req.body.additonalGuestNumber
  if (typeof additionalGuestNumber != 'number') {
    res.status(400).send(additionalGuestNumber);
    return
  }

  const additonalGuestName = req.body.additionalGuestName;
  if ( typeof additonalGuestName != 'string') {
    res.status(400).send("missing 'additonalGuestName' parameter");
    return
  }

  const additionalGuestDiteryRestriction = req.body.additionalGuestDiteryRestriction;
  if (typeof additionalGuestDiteryRestriction != 'string') {
    res.status(400).send("missing 'additionalGuestDiteryRestriction' parameter");
    return
  }

  const isFamily = req.body.isFamily;
  if (typeof isFamily != 'boolean') {
    res.status(400).send("missing 'additionalGuestDiteryRestriction' parameter");
    return
  }
  
  const exisitingGuest = GuestsServerMap.get(name);

  const guest = exisitingGuest ? exisitingGuest : {
    name: name,
    guestOf: guestOf, 
    dietRestriction: '',
    additionalGuestNumber: 2,
    additonalGuestName: '',
    additionalGuestDiteryRestriction: '', 
    isFamily: isFamily,
  }

  GuestsServerMap.set(name, guest);
  res.send({ Guest: GuestsServerMap});
}



/**
 * updates guests in the server map
 * @param res the response
 */
export const updateGuest = (req: SafeRequest, res: SafeResponse): void  => {
    
    const name = req.body.name;
    if (typeof name !== 'string') {
      res.status(400).send("missing 'name' parameter");
      return;
    }

    const guestOf = req.body.guestOf;
    if (typeof guestOf != 'string') {
      res.status(400).send("missing 'guestOf' parameter");
      return;
    }

    const dietRestriction = req.body.dietRestriction
    if (typeof dietRestriction != 'string') {
      res.status(400).send("missing 'dietRestriction' parameter");
      return
    }

    const additionalGuestNumber = req.body.additonalGuestNumber
    if (typeof additionalGuestNumber != 'number') {

      res.status(400).send(additionalGuestNumber);
      return
    }

    const additonalGuestName = req.body.additionalGuestName
    if ( typeof additonalGuestName != 'string') {
      res.status(400).send("missing 'additonalGuestName' parameter");
      return
    }

    const additionalGuestDiteryRestriction = req.body.additionalGuestDiteryRestriction;
    if (typeof additionalGuestDiteryRestriction != 'string') {
      res.status(400).send("missing 'additionalGuestDiteryRestriction' parameter");
      return
    }

    const isFamily = req.body.isFamily;
    if (typeof  isFamily != 'boolean') {
      res.status(400).send("missing 'isFamily' parameter");
      return
    }

    if (GuestsServerMap.has(guestOf)) {
      res.status(400).send(`additonal guest for '${name}' already exists. Cannot bring more guests`);
      return;
    }
  
    const Guest: guest = {
      name: name,
      guestOf: guestOf, 
      dietRestriction: dietRestriction,
      additionalGuestNumber: additionalGuestNumber,
      additonalGuestName: additonalGuestName,
      additionalGuestDiteryRestriction: additionalGuestDiteryRestriction,
      isFamily: isFamily
    }

    GuestsServerMap.set(Guest.name, Guest);
    res.send({ Guest: GuestsServerMap});
}



/**
 * Returns a list of all the guests in the server map as a load
 * @param res the response
 */

export const loadGuest = (_req: SafeRequest, res: SafeResponse): void => {
  const vals = Array.from(GuestsServerMap.values());
  res.send({Guests: vals});
};


// TODO: remove the dummy route
/**
 * Dummy route that just returns a hello message to the client.
 * @param req The request object
 * @param res The response object
 */
export const dummy = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send('missing or invalid "name" parameter');
    return;
  }

  res.send({msg: `Hi, ${name}!`});
};


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};
