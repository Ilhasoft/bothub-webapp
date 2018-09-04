<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <h1>hey</h1>
    <bh-table>
      <thead>
        <tr>
          <th>id</th>
          <th>nome</th>
          <th>Idade</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>teste here</td>
          <td>joaozinho</td>
          <td>20</td>
        </tr>
      </tbody>
    </bh-table>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from './Base';


const components = {
  RepositoryViewBase,
};

export default {
  name: 'RepositoryHome',
  components,
  extends: RepositoryBase,
};
</script>
