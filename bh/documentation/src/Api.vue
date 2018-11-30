<template>
  <div>
    <h3>API</h3>
    <div v-if="data.props && data.props.length > 0">
      <h4>Properties</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="prop in data.props"
            :key="prop.name">
            <td>{{ prop.name }}</td>
            <td>{{ prop.type }}</td>
            <td>{{ prop.description || '-' }}</td>
            <td><bh-icon :value="prop.required ? 'check' : 'close'" /></td>
            <td>{{ prop.default }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="data.slots && data.slots.length > 0">
      <h4>Slots</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="slot in data.slots"
            :key="slot.name">
            <td>{{ slot.name }}</td>
            <td>{{ slot.description || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="data.events && data.events.length > 0">
      <h4>Events</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Parameters</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="event in data.events"
            :key="event.name">
            <td>{{ event.name }}</td>
            <td>{{ event.description || '-' }}</td>
            <td>{{ event.parameters }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Api',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
