IMPORT REACT, { USESTATE, USEEFFECT } FROM 'react';

IMPORT AXIOS FROM 'axios';

CONST SERVICES = () => {
CONST [SERVICES, SETSERVICES] = USESTATE([]);

CONST [LOADING, SETLOADING] = USESTATE(FALSE);

USEEFFECT(() => {
CONST FETCHSERVICES = ASYNC () => {
SETLOADING(TRUE);

TRY {

// Fetch the list of active services from the backend

CONST RESPONSE = AWAIT AXIOS.GET('/api/services');

// Assuming the response data has a 'services' array

SETSERVICES(RESPONSE.DATA.SERVICES);

} CATCH (ERROR) {
CONSOLE.ERROR('Error fetching services:', ERROR);

} FINALLY {
SETLOADING(FALSE);

}
};

FETCHSERVICES();

}, []);

CONST HANDLEADDTOCART = ASYNC (SERVICE) => {
TRY {

// Post request to add the selected service to the cart

AWAIT AXIOS.POST('/api/cart', {
COMMODITYID: SERVICE.SERVICE_ID, // ADJUSTED FIELD TO MATCH THE DATABASE
QUANTITY: 1, // ASSUMING ADDING 1 TO THE CART
}, {
HEADERS: {
AUTHORIZATION: `BEARER ${LOCALSTORAGE.GETITEM('token')}`, // SEND JWT FOR AUTHENTICATION
},
});

ALERT('Service added to cart successfully!');

} CATCH (ERROR) {
CONSOLE.ERROR('Error adding to cart:', ERROR);

ALERT('Error adding to cart. Please try again.');

}
};

CONST HANDLEBUYNOW = ASYNC (SERVICE) => {
TRY {

// Initiate a payment for the service

CONST RESPONSE = AWAIT AXIOS.POST('/api/checkout', {
SERVICEID: SERVICE.SERVICE_ID, // ADJUSTED FIELD TO MATCH THE DATABASE
AMOUNT: SERVICE.PRICE, // ASSUMING SERVICE.PRICE HOLDS THE AMOUNT
}, {
HEADERS: {
AUTHORIZATION: `BEARER ${LOCALSTORAGE.GETITEM('token')}`, // SEND JWT FOR AUTHENTICATION
},
});

// Redirect user to the payment URL

WINDOW.LOCATION.HREF = RESPONSE.DATA.AUTHORIZATION_URL;

} CATCH (ERROR) {
CONSOLE.ERROR('Error during checkout:', ERROR);

ALERT('Error during checkout. Please try again.');

}
};

RETURN (
<DIV CLASSNAME="p-6 bg-white rounded-lg shadow-md">
<H2 CLASSNAME="text-2xl font-semibold mb-4">SERVICES</H2>
{LOADING ? (
<P>LOADING SERVICES...</P>
) : (
<DIV CLASSNAME="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{SERVICES.LENGTH === 0 ? (
<P>NO SERVICES AVAILABLE.</P>
) : (
SERVICES.MAP((SERVICE) => (
<DIV KEY={SERVICE.SERVICE_ID} CLASSNAME="p-4 bg-gray-100 rounded-lg shadow-md">
<IMG
SRC={SERVICE.IMAGE_URL || '/fallback-image.png'} // ENSURE IMAGE_URL MATCHES DATABASE FIELD
ALT={SERVICE.NAME}
CLASSNAME="w-full h-32 object-cover rounded"

/>

<H3 CLASSNAME="text-lg font-semibold mt-4">{SERVICE.NAME}</H3>
<P>{SERVICE.DESCRIPTION}</P>
<DIV CLASSNAME="flex justify-between items-center mt-4">
<SPAN CLASSNAME="font-semibold">₦{SERVICE.PRICE.TOFIXED(2)}</SPAN>
<DIV CLASSNAME="flex gap-2">
<BUTTON
ONCLICK={() => HANDLEADDTOCART(SERVICE)}
CLASSNAME="bg-blue-600 text-white px-4 py-2 rounded"
>
ADD TO CART
</BUTTON>
<BUTTON
ONCLICK={() => HANDLEBUYNOW(SERVICE)}
CLASSNAME="bg-green-600 text-white px-4 py-2 rounded"
>
BUY NOW
</BUTTON>
</DIV>
</DIV>
</DIV>
))
)}
</DIV>
)}
</DIV>
);

};

EXPORT DEFAULT SERVICES;