import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { dummy, addGuest, updateGuest, loadGuest, guest} from './routes';


describe('routes', function() {

  // TODO: remove the tests for the dummy route
  it('dummy', function() {
    const req1 = httpMocks.createRequest(
        {method: 'GET', url: '/api/dummy', query: {name: 'Bob'} });
    const res1 = httpMocks.createResponse();
    dummy(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), {msg: "Hi, Bob!"});
  });

  it('create', function() {
    //first branch straight line code

    const args = {
      name: 0, 
      guestOf: 'James',
      dietRestriction: '',
      additonalGuestNumber: 2,
      additionalGuestName: '', 
      additionalGuestDiteryRestriction: '', 
      isFamily: false
    }

    const req = httpMocks.createRequest(
      {method: 'POST', url: '/api/create', body: {name: args.name, body: JSON.stringify(args)}});
      const res = httpMocks.createResponse();
      addGuest(req, res);
  
      assert.deepStrictEqual(res._getStatusCode(), 400);
      assert.deepStrictEqual(res._getData(),
      "missing 'name' parameter");

    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/create', body: {name: args.name, body: JSON.stringify(args)}});
        const res2 = httpMocks.createResponse();
        addGuest(req2, res2);
    
        assert.deepStrictEqual(res._getStatusCode(), 400);
        assert.deepStrictEqual(res._getData(),
        "missing 'name' parameter");

    //second branch, straight line code

    const args1 = {
      name: 'chinee', 
      guestOf: 0,
      dietRestriction: '',
      additonalGuestNumber: 2,
      additionalGuestName: '', 
      additionalGuestDiteryRestriction: '', 
      isFamily: false
    }

    const req1 = httpMocks.createRequest(
      {method: 'POST', url: '/api/create', body: {name: args1.name, body: JSON.stringify(args1)}});
      const res1 = httpMocks.createResponse();
      addGuest(req1, res1);
  
      assert.deepStrictEqual(res1._getStatusCode(), 400);
      assert.deepStrictEqual(res1._getData(),
      "missing 'guestOf' parameter");
      
    const req3 = httpMocks.createRequest(
        {method: 'POST', url: '/api/create', body: {name: args1.name, body: JSON.stringify(args1)}});
        const res3 = httpMocks.createResponse();
        addGuest(req3, res3);
    
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(),
        "missing 'guestOf' parameter");
    //Third branch, straight line code

    const args2 = {
      name: 'chinee', 
      guestOf: 'Molly',
      dietRestriction: 0,
      additonalGuestNumber: 2,
      additionalGuestName: '', 
      additionalGuestDiteryRestriction: '', 
      isFamily: false
    }

    const req4 = httpMocks.createRequest(
      {method: 'POST', url: '/api/create', body: {name: args2.name, body: JSON.stringify(args2)}});
      const res4 = httpMocks.createResponse();
      addGuest(req4, res4);
  
      assert.deepStrictEqual(res4._getStatusCode(), 400);
      assert.deepStrictEqual(res4._getData(),
      "missing 'guestOf' parameter");

      const req5 = httpMocks.createRequest(
        {method: 'POST', url: '/api/create', body: {name: args2.name, body: JSON.stringify(args2)}});
        const res5 = httpMocks.createResponse();
        addGuest(req5, res5);
    
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(),
        "missing 'guestOf' parameter");

    //fourth branch, straight line code
    const args3 = {
      name: 'chinee', 
      guestOf: 'Molly',
      dietRestriction: '',
      additonalGuestNumber: '',
      additionalGuestName: '', 
      additionalGuestDiteryRestriction: '', 
      isFamily: false
    }

    const req6 = httpMocks.createRequest(
      {method: 'POST', url: '/api/create', body: {name: args3.name, body: JSON.stringify(args3)}});
      const res6 = httpMocks.createResponse();
      addGuest(req6, res6);

      assert.deepStrictEqual(res6._getStatusCode(), 400);
      console.log(res6._getData());
      assert.deepStrictEqual(res6._getData(),
      "missing 'guestOf' parameter");

  });


  it('save', function() {

    //first branch straight line code
    const args = {
      name: 0, 
      guestOf: 'James',
      dietRestriction: '',
      additonalGuestNumber: 2,
      additionalGuestName: '', 
      additionalGuestDiteryRestriction: '', 
      isFamily: false
    }

    const req = httpMocks.createRequest(
      {method: 'POST', url: '/api/save', body: {name: args.name, body: JSON.stringify(args)}});
      const res = httpMocks.createResponse();
      updateGuest(req, res);

      assert.deepStrictEqual(res._getStatusCode(), 400);
      assert.deepStrictEqual(res._getData(),
      "missing 'name' parameter");
    
    
    const req2 = httpMocks.createRequest(
      {method: 'POST', url: '/api/create', body: {name: args.name, body: JSON.stringify(args)}});
      const res2 = httpMocks.createResponse();
      updateGuest(req2, res2);
      assert.deepStrictEqual(res._getStatusCode(), 400);
      assert.deepStrictEqual(res._getData(),
      "missing 'name' parameter");

    

    //second branch straight line code
    const args1 = {
      name: '', 
      guestOf: 'James',
      dietRestriction: '',
      additonalGuestNumber: 2,
      additionalGuestName: '', 
      additionalGuestDiteryRestriction: '', 
      isFamily: false
    }

    const req1 = httpMocks.createRequest(
      {method: 'POST', url: '/api/save', body: {name: args1.name, body: JSON.stringify(args1)}});
      const res1 = httpMocks.createResponse();
      updateGuest(req1, res1);

      assert.deepStrictEqual(res1._getStatusCode(), 400);
      assert.deepStrictEqual(res1._getData(),
      "missing 'guestOf' parameter");
    
    
    const req3 = httpMocks.createRequest(
        {method: 'POST', url: '/api/save', body: {name: args1.name, body: JSON.stringify(args1)}});
        const res3 = httpMocks.createResponse();
        updateGuest(req3, res3);
  
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(),
        "missing 'guestOf' parameter");

    
     //third branch straight line code
     const args3 = {
      name: '', 
      guestOf: 'James',
      dietRestriction: '',
      additonalGuestNumber: 2,
      additionalGuestName: '', 
      additionalGuestDiteryRestriction: '', 
      isFamily: false
    }
  

    const req4 = httpMocks.createRequest(
      {method: 'POST', url: '/api/save', body: {name: args3.name, body: JSON.stringify(args3)}});
      const res4 = httpMocks.createResponse();
      updateGuest(req4, res4);

      assert.deepStrictEqual(res1._getStatusCode(), 400);
      assert.deepStrictEqual(res1._getData(),
      "missing 'guestOf' parameter");

    const req5 = httpMocks.createRequest(
      {method: 'POST', url: '/api/save', body: {name: args3.name, body: JSON.stringify(args3)}});
      const res5 = httpMocks.createResponse();
      updateGuest(req5, res5);
  
      assert.deepStrictEqual(res1._getStatusCode(), 400);
      assert.deepStrictEqual(res1._getData(),
      "missing 'guestOf' parameter");

    //fourth branch straight line code
    const args4 = {
      name: '', 
      guestOf: 'James',
      dietRestriction: '',
      additonalGuestNumber: 2,
      additionalGuestName: '', 
      additionalGuestDiteryRestriction: '', 
      isFamily: false
    }

    const req6 = httpMocks.createRequest(
      {method: 'POST', url: '/api/save', body: {name: args4.name, body: JSON.stringify(args4)}});
      const res6 = httpMocks.createResponse();
      updateGuest(req6, res6);

      assert.deepStrictEqual(res1._getStatusCode(), 400);
      assert.deepStrictEqual(res1._getData(),
      "missing 'guestOf' parameter");

    const req7 = httpMocks.createRequest(
      {method: 'POST', url: '/api/save', body: {name: args3.name, body: JSON.stringify(args3)}});
      const res7 = httpMocks.createResponse();
      updateGuest(req7, res7);
  
      assert.deepStrictEqual(res1._getStatusCode(), 400);
      assert.deepStrictEqual(res1._getData(),
      "missing 'guestOf' parameter");
  })

  it('load', function() {
    // testing with empty array. 


    const Guest: guest = {
      name: 'chinee',
      guestOf: "Molly",
      dietRestriction: "non",
      additionalGuestNumber: 0,
      additonalGuestName: 'james',
      additionalGuestDiteryRestriction: 'none',
      isFamily: false
    }

    const GuestsServerMap: Map<string, guest> = new Map();
    GuestsServerMap.set('chinee', Guest);

    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/load'
    });

    const res = httpMocks.createResponse();

    loadGuest(req, res);


    assert.deepStrictEqual(res._getStatusCode(), 200);
    const responseData = res._getData();
    assert.strictEqual(typeof responseData, 'object');
    assert.deepStrictEqual(responseData, { Guests: [] });

  }); 
});
