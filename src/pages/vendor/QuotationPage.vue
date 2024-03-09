<template>
  <q-page>
    <q-card-section class="text-h6">Quotation Details</q-card-section>
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label>Quotation ID:</q-item-label>
        </q-item-section>
        <q-item-section>{{ quotationId }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Supplier Name:</q-item-label>
        </q-item-section>
        <q-item-section>{{ supplierName }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Date:</q-item-label>
        </q-item-section>
        <q-item-section>{{ date }}</q-item-section>
      </q-item>
    </q-card-section>

    <q-card-section class="text-h6">Item Details</q-card-section>
    <q-card-section>
      <q-table
        class="shadow-md"
        flat
        bordered
        :rows="items"
        :columns="columns"
        row-key="id"
      />
    </q-card-section>

    <q-card-section class="text-h6">Quotation Summary</q-card-section>
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label>Total Quoted Price:</q-item-label>
        </q-item-section>
        <q-item-section>{{ totalQuotedPrice }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Validity Period:</q-item-label>
        </q-item-section>
        <q-item-section>{{ validityPeriod }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Delivery Terms:</q-item-label>
        </q-item-section>
        <q-item-section>{{ deliveryTerms }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Payment Terms:</q-item-label>
        </q-item-section>
        <q-item-section>{{ paymentTerms }}</q-item-section>
      </q-item>
    </q-card-section>

    <q-card-section class="text-h6">Notes</q-card-section>
    <q-card-section>{{ notes }}</q-card-section>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      quotationId: "QUO-1234",
      supplierName: "Supplier Company",
      date: "2024-03-04",
      items: [
        {
          id: 1,
          description: "Item 1",
          quantity: 5,
          unitPrice: 10,
          totalPrice: 50,
        },
        {
          id: 2,
          description: "Item 2",
          quantity: 3,
          unitPrice: 20,
          totalPrice: 60,
        },
      ],
      columns: [
        {
          name: "description",
          label: "Item Description",
          align: "left",
          field: "description",
          sortable: true,
        },
        {
          name: "quantity",
          label: "Quantity",
          align: "center",
          field: "quantity",
          sortable: true,
        },
        {
          name: "unitPrice",
          label: "Unit Price",
          align: "right",
          field: "unitPrice",
          sortable: true,
        },
        {
          name: "totalPrice",
          label: "Total Price",
          align: "right",
          field: "totalPrice",
          sortable: true,
        },
      ],
      totalQuotedPrice: 110,
      validityPeriod: "30 days",
      deliveryTerms: "Ex-Works",
      paymentTerms: "Net 30 days",
      notes: "Additional notes...",
    };
  },
};
</script>

<style>
.q-card-section {
  padding: 10px;
}
.q-item-label {
  font-weight: bold;
}
</style>
