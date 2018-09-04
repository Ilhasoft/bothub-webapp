<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <h1>hey</h1>
    <bh-table>
      <thead>
        <tr>
          <th>Entities</th>
          <th>Synonyms</th>
        </tr>
      </thead>
      <tr>
        <td>Comprar</td>
        <td>Mercar Obter Adiquirir</td>
      </tr>
      <tr>
        <td>Generic</td>
        <td>Mercar Obter Adiquirir</td>
      </tr>
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
