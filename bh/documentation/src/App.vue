<template>
  <div class="app">
    <div class="bh-grid bh-grid--column">
      <section class="bh-grid__item bh-grid__item--nested">
        <header-component />
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <installation />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <typography />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <grid />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item bh-grid__item--nested">
              <autocomplete />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <card />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <buttons />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <icons />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <avatar />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <badge />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <modal />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <text-input />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <dropdown />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <loading />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <notification />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <icon-button />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <language-flag />
            </div>
          </div>
        </bh-card>
      </section>
      <section class="bh-grid__item">
        <bh-card>
          <div class="bh-grid">
            <div class="bh-grid__item">
              <Tooltip />
            </div>
          </div>
        </bh-card>
      </section>
    </div>
  </div>
</template>

<script>
import Installation from './installation/Installation';
import Typography from './typography/Typography';
import Grid from './grid/Grid';
import Autocomplete from './autocomplete/Autocomplete';
import Card from './card/Card';
import Buttons from './button/Buttons';
import HeaderComponent from './header/HeaderComponent';
import Icons from './icon/Icon';
import Avatar from './avatar/Avatar';
import Badge from './badge/Badge';
import Modal from './modal/Modal';
import TextInput from './text-input/TextInput';
import Dropdown from './dropdown/Dropdown';
import loading from './loading/Loading';
import Notification from './notification/Notification';
import IconButton from './icon-button/IconButton';
import LanguageFlag from './languageFlag/LanguageFlag';
import Tooltip from './tooltip/Tooltip';

export default {
  name: 'App',
  components: {
    Installation,
    Typography,
    Grid,
    Autocomplete,
    Card,
    Buttons,
    HeaderComponent,
    Icons,
    Avatar,
    Badge,
    Modal,
    TextInput,
    Dropdown,
    loading,
    Notification,
    IconButton,
    LanguageFlag,
    Tooltip,
  },
};
</script>
