<script lang="ts">
  import { onMount } from 'svelte';
  import {
    COLOR_THEMES,
    getFormattedTime,
    getSavedTheme,
    getSavedTimezone,
    saveTheme,
    saveTimezone,
    startTimeUpdates,
    TIMEZONES
  } from '#lib/clock.js';
  import type { ColorTheme, Timezone } from '#lib/clock.js';
  import '#lib/clock.css';

  let time = $state(new Date());
  let currentTheme = $state<ColorTheme>(COLOR_THEMES[0]);
  let currentTimezone = $state<Timezone>(TIMEZONES[0]);
  const formattedTime = $derived(getFormattedTime(time, currentTimezone.timezone));

  function applyTheme(theme: ColorTheme): void {
    document.documentElement.style.setProperty('--neon-color', theme.color);
    document.documentElement.style.setProperty('--neon-glow', theme.glow);
  }

  function selectTheme(theme: ColorTheme): void {
    currentTheme = theme;
    saveTheme(theme);
    applyTheme(theme);
  }

  function selectTimezone(timezone: Timezone): void {
    currentTimezone = timezone;
    saveTimezone(timezone);
  }

  onMount(() => {
    currentTheme = getSavedTheme();
    currentTimezone = getSavedTimezone();
    applyTheme(currentTheme);

    const intervalId = startTimeUpdates((newTime) => {
      time = newTime;
    });

    return () => clearInterval(intervalId);
  });
</script>

<svelte:head>
  <title>Horloge mondiale</title>
  <meta name="description" content="Consultez l'heure locale dans plusieurs villes du monde." />
</svelte:head>

<main class="clock-page">
  <div class="ambient" aria-hidden="true"></div>

  <section class="clock-area" aria-label="Horloge mondiale">
    <p class="location">
      <span>{currentTimezone.city}, {currentTimezone.name}</span>
    </p>

    <div class="clock-container">
      <time
        class="clock"
        datetime={`${formattedTime.hours}:${formattedTime.minutes}:${formattedTime.seconds}`}
        aria-label={`Heure à ${currentTimezone.city} : ${formattedTime.hours} heures ${formattedTime.minutes} minutes ${formattedTime.seconds} secondes`}
      >
        <span class="digit">{formattedTime.hours}</span>
        <span class="separator" aria-hidden="true">:</span>
        <span class="digit">{formattedTime.minutes}</span>
        <span class="separator" aria-hidden="true">:</span>
        <span class="digit">{formattedTime.seconds}</span>
      </time>

      <div class="reflection" aria-hidden="true">
        <span class="digit">{formattedTime.hours}</span>
        <span class="separator">:</span>
        <span class="digit">{formattedTime.minutes}</span>
        <span class="separator">:</span>
        <span class="digit">{formattedTime.seconds}</span>
      </div>
    </div>

    <fieldset class="timezone-section">
      <legend>Heure dans une autre ville</legend>
      <div class="timezone-row">
        {#each TIMEZONES as timezone (timezone.timezone)}
          <button
            class="tz-btn"
            class:active={currentTimezone.name === timezone.name}
            type="button"
            onclick={() => selectTimezone(timezone)}
            aria-label={`Afficher l'heure à ${timezone.city}, ${timezone.name}`}
            aria-pressed={currentTimezone.name === timezone.name}
          >
            <span class="tz-info">
              <span class="tz-city">{timezone.city}</span>
              <span class="tz-country">{timezone.name}</span>
            </span>
          </button>
        {/each}
      </div>
    </fieldset>

    <fieldset class="color-section">
      <legend>Couleur</legend>
      <div class="color-row">
        {#each COLOR_THEMES as theme (theme.name)}
          <button
            class="color-dot"
            class:active={currentTheme.name === theme.name}
            type="button"
            style:--swatch-color={theme.color}
            onclick={() => selectTheme(theme)}
            aria-label={`Choisir le thème ${theme.name}`}
            aria-pressed={currentTheme.name === theme.name}
          ></button>
        {/each}
      </div>
    </fieldset>
  </section>
</main>
