This is an LWC that is designed to work in the utility bar of a lightning app.  Service Cloud Voice w/ Amazon Connect does not currently provide a way to easily make outbound phone calls from an address book.

This component is built to work off of a Contact listview that contains the FirstName and Phone fields.  The "Call" leverages the lightning click to dial component to place a call within service cloud voice.  

When adding the Utility Item, set the page size and list view API name in the configuration section.
