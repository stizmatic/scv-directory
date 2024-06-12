import { LightningElement, api, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

const COLUMNS = [
    { label: 'First Name', fieldName: 'FirstName' },
    {
        label: 'Phone',
        type: 'button',
        typeAttributes: {
            label: 'Call',
            iconName: 'utility:call',
            name: 'call',
            variant: 'base'
        },
        cellAttributes: {
            class: 'slds-truncate',
            alignment: 'center'
        }
    },
];

export default class ContactList extends LightningElement {
    @api pageSize = 50; // default value
    @api listViewApiName = 'AllContacts'; // default value

    columns = COLUMNS;
    searchKey = '';
    contacts = [];
    error = null;

    @wire(getListUi, {
        objectApiName: CONTACT_OBJECT,
        listViewApiName: '$listViewApiName',
        pageSize: '$pageSize'
    })
    wiredListView({ error, data }) {
        if (data) {
            this.contacts = data.records.records.map(record => ({
                Id: record.fields.Id.value,
                FirstName: record.fields.FirstName.value,
                Phone: record.fields.Phone.value
            }));
            this.error = null;
        } else if (error) {
            this.error = error;
            this.contacts = [];
        }
    }

    get filteredContacts() {
        if (this.searchKey.trim() === '') {
            return this.contacts;
        }

        const searchKeyLowerCase = this.searchKey.trim().toLowerCase();
        return this.contacts.filter(contact =>
            contact.FirstName.toLowerCase().includes(searchKeyLowerCase)
        );
    }

    handleSearchKeyChange(event) {
        this.searchKey = event.target.value;
    }

    handlePhoneClick(event) {
        const contactId = event.detail.row.Id;
        const contact = this.contacts.find(contact => contact.Id === contactId);
        if (contact && contact.Phone) {
            const clickToDial = this.template.querySelector(`[data-id="${contact.Id}"]`);
            if (clickToDial) {
                clickToDial.click();
            }
        }
    }
}
