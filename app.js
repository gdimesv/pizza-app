(() => {
  const storageKey = "pizzaApp.recipes";
  const flourStorageKey = "pizzaApp.flours";
  const newRecipeForm = document.querySelector("#new-recipe-form");
  const recipeListContainer = document.querySelector("#recipe-list");
  const feedbackDialog = document.querySelector("#feedback-dialog");
  const feedbackMessage = document.querySelector("#feedback-message");
  const recipeTemplate = document.querySelector("#recipe-card-template");
  const flourCardTemplate = document.querySelector("#flour-card-template");
  const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
  const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));
  const recipePhotoInput = document.querySelector("#recipe-photo");
  const photoPreview = document.querySelector(".file-field__preview");
  const photoPreviewImage = photoPreview?.querySelector("img") ?? null;
  const photoRemoveButton =
    photoPreview?.querySelector(".file-field__remove") ?? null;
  const successPanel = document.querySelector("#new-recipe-success");
  const successRecipeName = document.querySelector("#success-recipe-name");
  const successRecipeFermentation = document.querySelector(
    "#success-recipe-fermentation"
  );
  const successRecipeHydration = document.querySelector(
    "#success-recipe-hydration"
  );
  const successRecipeTime = document.querySelector("#success-recipe-time");
  const successMoreDetails = document.querySelector("#success-more-details");
  const successRecipeStyle = document.querySelector("#success-recipe-style");
  const successRecipeFlour = document.querySelector("#success-recipe-flour");
  const successRecipeTotalDough = document.querySelector(
    "#success-recipe-total-dough"
  );
  const successRecipePreferment = document.querySelector(
    "#success-recipe-preferment"
  );
  const successRecipeTemperature = document.querySelector(
    "#success-recipe-temperature"
  );
  const recipeDetailDialog = document.querySelector("#recipe-detail-dialog");
  const recipeDetailTitle =
    recipeDetailDialog?.querySelector(".recipe-detail__title") ?? null;
  const recipeDetailMeta =
    recipeDetailDialog?.querySelector(".recipe-detail__meta") ?? null;
  const recipeDetailPhoto =
    recipeDetailDialog?.querySelector(".recipe-card__photo") ?? null;
  const recipeDetailPhotoImage =
    recipeDetailPhoto?.querySelector("img") ?? null;
  const recipeDetailFacts =
    recipeDetailDialog?.querySelector(".recipe-card__facts") ?? null;
  const recipeDetailNotesSection =
    recipeDetailDialog?.querySelector(".recipe-detail__section--notes") ?? null;
  const recipeDetailNotes =
    recipeDetailDialog?.querySelector(".recipe-card__notes") ?? null;
  const recipeDetailBlendList =
    recipeDetailDialog?.querySelector(".recipe-card__blend") ?? null;
  const recipeDetailFormulaList =
    recipeDetailDialog?.querySelector(".recipe-card__formula") ?? null;
  const recipeDetailRatingsList =
    recipeDetailDialog?.querySelector(".recipe-card__ratings") ?? null;
  const recipeDetailEvaluationForm =
    recipeDetailDialog?.querySelector(".recipe-evaluation-form") ?? null;
  const recipeDetailEvaluationRating =
    recipeDetailEvaluationForm?.querySelector("#recipe-evaluation-rating") ??
    null;
  const recipeDetailEvaluationNotes =
    recipeDetailEvaluationForm?.querySelector("#recipe-evaluation-notes") ??
    null;
  const recipeDetailEvaluationFeedback =
    recipeDetailDialog?.querySelector("#recipe-evaluation-feedback") ?? null;
  const recipeDetailDeleteButton =
    recipeDetailDialog?.querySelector(".recipe-detail__delete") ?? null;
  const recipeDetailCloseButtons = recipeDetailDialog
    ? Array.from(recipeDetailDialog.querySelectorAll("[data-close-dialog]"))
    : [];
  const recipeStyleSelect = document.querySelector("#recipe-style");
  const recipeStyleCustomGroup = document.querySelector(
    "#recipe-style-custom-group"
  );
  const recipeStyleCustomInput = document.querySelector(
    "#recipe-style-custom"
  );
  const recipeOpenFloursButton = document.querySelector(
    "#recipe-open-flours"
  );
  const flourBlendList = document.querySelector("#flour-blend-list");
  const flourBlendAddButton = document.querySelector("#flour-blend-add");
  const flourBlendTotal = document.querySelector("#flour-blend-total");
  const flourBlendRowTemplate = document.querySelector(
    "#flour-blend-row-template"
  );
  const recipeFermentationSelect = document.querySelector(
    "#recipe-fermentation"
  );
  const recipeFermentationTimeInput = document.querySelector(
    "#recipe-fermentation-time"
  );
  const recipeFermentationTempSelect = document.querySelector(
    "#recipe-fermentation-temp"
  );
  const fermentationTemperatureFields = document.querySelector(
    "#fermentation-temperature-fields"
  );
  const fermentationTempAmbientField = document.querySelector(
    "#fermentation-temp-ambient-field"
  );
  const fermentationTempControlledField = document.querySelector(
    "#fermentation-temp-controlled-field"
  );
  const fermentationTimeAmbientField = document.querySelector(
    "#fermentation-time-ambient-field"
  );
  const recipeFermentationAmbientTempInput = document.querySelector(
    "#recipe-fermentation-temp-ambient"
  );
  const recipeFermentationControlledTempInput = document.querySelector(
    "#recipe-fermentation-temp-controlled"
  );
  const recipeFermentationAmbientDurationInput = document.querySelector(
    "#recipe-fermentation-time-ambient"
  );
  const prefermentFields = document.querySelector("#preferment-fields");
  const prefermentTypeSelect = document.querySelector("#preferment-type");
  const prefermentInoculationInput = document.querySelector(
    "#preferment-inoculation"
  );
  const prefermentHydrationInput = document.querySelector(
    "#preferment-hydration"
  );
  const prefermentMaturationInput = document.querySelector(
    "#preferment-maturation"
  );
  const formulaDoughCountInput = document.querySelector(
    "#formula-dough-count"
  );
  const formulaDoughWeightInput = document.querySelector(
    "#formula-dough-weight"
  );
  const formulaTotalFlourInput = document.querySelector(
    "#formula-total-flour"
  );
  const formulaWaterInput = document.querySelector("#formula-water");
  const formulaSaltInput = document.querySelector("#formula-salt");
  const formulaYeastInput = document.querySelector("#formula-yeast");
  const formulaFatInput = document.querySelector("#formula-fat");
  const formulaSugarInput = document.querySelector("#formula-sugar");
  const formulaYeastAutoButton = document.querySelector("#formula-yeast-auto");
  const formulaYeastFeedback = document.querySelector("#formula-yeast-feedback");
  const formulaYeastWarning = document.querySelector("#formula-yeast-warning");
  const successFlourBlendList = document.querySelector("#success-flour-blend");
  const successFormulaList = document.querySelector("#success-formula");
  const flourListContainer = document.querySelector("#flour-list");
  const flourEmptyMessage = document.querySelector("#flour-empty-message");
  const flourFiltersForm = document.querySelector("#flour-filters");
  const flourFilterType = document.querySelector("#flour-filter-type");
  const flourFilterProtein = document.querySelector("#flour-filter-protein");
  const flourFilterStrength = document.querySelector("#flour-filter-strength");
  const flourNewButton = document.querySelector("#flour-new-button");
  const flourFormContainer = document.querySelector("#flour-form-container");
  const flourForm = document.querySelector("#flour-form");
  const flourFormTitle = document.querySelector("#flour-form-title");
  const flourFormSubmit = document.querySelector("#flour-form-submit");
  const flourFormCancel = document.querySelector("#flour-form-cancel");

  const state = {
    recipes: [],
    activeTab: "create",
    pendingPhoto: null,
    skipResetEffects: false,
    flours: [],
    flourFilters: {
      type: "all",
      protein: "all",
      strength: "all",
    },
    editingFlourId: null,
    flourBlendCounter: 0,
    yeastSuggestion: null,
  };

  let activeRecipeDetail = null;

  const safeStorage = {
    load() {
      try {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed
          .filter((item) => item && typeof item === "object")
          .map((item) => ({
            ...item,
            ratings: Array.isArray(item.ratings) ? item.ratings : [],
          }));
      } catch (err) {
        console.error("Falha ao carregar receitas:", err);
        return [];
      }
    },
    save(recipes) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(recipes));
      } catch (err) {
        console.error("Falha ao salvar receitas:", err);
        showFeedback(
          "Não foi possível salvar a alteração. Verifique o espaço disponível e tente novamente."
        );
      }
    },
  };

  const flourStorage = {
    load() {
      try {
        const raw = localStorage.getItem(flourStorageKey);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed
          .filter((item) => item && typeof item === "object")
          .map((item) => {
            const toIsoOrNull = (value) => {
              if (!value) return null;
              const date = new Date(value);
              return Number.isNaN(date.getTime()) ? null : date.toISOString();
            };

            const createdAt = toIsoOrNull(item.createdAt) ?? new Date().toISOString();
            const updatedAt = toIsoOrNull(item.updatedAt) ?? createdAt;

            return {
              id:
                typeof item.id === "string" && item.id.trim()
                  ? item.id
                  : crypto.randomUUID(),
              name: (item.name || "").toString().trim(),
              type: (item.type || "").toString().trim(),
              protein: parseNumeric(item.protein),
              strength: parseNumeric(item.strength ?? item.w),
              pl: parseNumeric(item.pl ?? item.plValue),
              absorption: parseNumeric(item.absorption),
              milling: (item.milling || item.grinding || "").toString().trim(),
              expirationDate: toIsoOrNull(item.expirationDate ?? item.expiration),
              notes: (item.notes || item.observations || "").toString().trim(),
              createdAt,
              updatedAt,
            };
          });
      } catch (err) {
        console.error("Falha ao carregar farinhas:", err);
        return [];
      }
    },
    save(flours) {
      try {
        localStorage.setItem(flourStorageKey, JSON.stringify(flours));
      } catch (err) {
        console.error("Falha ao salvar farinhas:", err);
        showFeedback(
          "Não foi possível salvar a farinha. Verifique o espaço disponível e tente novamente."
        );
      }
    },
  };

  function initThemeListener() {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = (isDark) => {
      document.body.classList.toggle("dark", isDark);
    };

    applyTheme(media.matches);
    media.addEventListener("change", (event) => applyTheme(event.matches));
  }

  function showFeedback(message) {
    feedbackMessage.textContent = message;
    feedbackDialog.showModal();
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "Data desconhecida";
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }

  function computeAverageScore(ratings) {
    if (!ratings.length) return null;
    const total = ratings.reduce((sum, rating) => sum + rating.score, 0);
    return +(total / ratings.length).toFixed(1);
  }

  const decimalFormatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });

  const smallDecimalFormatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const DEFAULT_TEMPERATURES = {
    TA: 24,
    TC: 6,
  };
  const TEMPERATURE_SENSITIVITY = 6; // °C por dobra da atividade
  const YEAST_BASE_TABLE = [
    { min: 48, base: 0.045 },
    { min: 36, base: 0.055 },
    { min: 24, base: 0.08 },
    { min: 18, base: 0.12 },
    { min: 12, base: 0.2 },
    { min: 6, base: 0.35 },
    { min: 0, base: 0.5 },
  ];
  const METHOD_FACTORS = {
    Direta: 1,
    Biga: 0.6,
    Poolish: 0.7,
    Levain: 0.25,
    Outros: 0.85,
  };
  const MIN_YEAST_PERCENTAGE = 0.01;
  const MAX_YEAST_PERCENTAGE = 1;

  const weightFormatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });

  const dateOnlyFormatter = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
  });

  const flourStrengthRanges = {
    all: null,
    lt260: { max: 260 },
    "260-300": { min: 260, max: 300 },
    "300-350": { min: 300, max: 350 },
    gt350: { min: 350 },
  };

  const flourProteinRanges = {
    all: null,
    lt11: { max: 11 },
    "11-12_5": { min: 11, max: 12.5 },
    gt12_5: { min: 12.5 },
  };

  function parseNumeric(value) {
    if (value === null || value === undefined) return null;
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
      const normalized = value.replace(",", ".").trim();
      if (!normalized) return null;
      const parsed = Number(normalized);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
  }

  function nearlyEqual(a, b, tolerance = 0.01) {
    const numA = parseNumeric(a);
    const numB = parseNumeric(b);
    if (numA === null && numB === null) return true;
    if (numA === null || numB === null) return false;
    return Math.abs(numA - numB) <= tolerance;
  }

  function formatPercentage(value) {
    const numeric = parseNumeric(value);
    if (numeric === null) return "";
    return `${decimalFormatter.format(numeric)}%`;
  }

  function formatHours(value) {
    const numeric = parseNumeric(value);
    if (numeric === null) return "";
    const label = numeric === 1 ? "hora" : "horas";
    return `${decimalFormatter.format(numeric)} ${label}`;
  }

  function formatTemperatureValue(value) {
    const numeric = parseNumeric(value);
    if (numeric === null) return null;
    return `${decimalFormatter.format(numeric)}°C`;
  }

  function formatFermentationTemperature(
    value,
    details = null,
    totalTime = null
  ) {
    if (!value) return "";
    const formatDurationShort = (hours) => {
      const numeric = parseNumeric(hours);
      if (numeric === null) return null;
      return `${decimalFormatter.format(numeric)}h`;
    };

    if (value === "TC") {
      const controlledLabel = formatTemperatureValue(details?.controlled);
      if (controlledLabel) {
        return `Temperatura controlada (TC) — ${controlledLabel}`;
      }
      return "Temperatura controlada (TC)";
    }

    if (value === "Mista") {
      const ambientTempLabel = formatTemperatureValue(details?.ambient);
      const controlledTempLabel = formatTemperatureValue(details?.controlled);
      const ambientDurationLabel = formatDurationShort(
        details?.ambientDuration
      );
      const controlledDurationLabel = formatDurationShort(
        details?.controlledDuration ??
          (totalTime !== null && ambientDurationLabel !== null
            ? Math.max(totalTime - parseNumeric(details?.ambientDuration), 0)
            : null)
      );

      const segments = [];
      if (ambientTempLabel) {
        const partDuration = ambientDurationLabel
          ? ` ${ambientDurationLabel}`
          : "";
        segments.push(`TA${partDuration} @ ${ambientTempLabel}`);
      }
      if (controlledTempLabel) {
        const partDuration = controlledDurationLabel
          ? ` ${controlledDurationLabel}`
          : "";
        segments.push(`TC${partDuration} @ ${controlledTempLabel}`);
      }

      if (!segments.length) {
        return "Temperatura mista (TA + TC)";
      }
      return `Temperatura mista (${segments.join(" + ")})`;
    }

    const ambientLabel = formatTemperatureValue(details?.ambient);
    if (ambientLabel) {
      return `Temperatura ambiente (TA) — ${ambientLabel}`;
    }
    return "Temperatura ambiente (TA)";
  }

  function formatDateOnly(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "";
    return dateOnlyFormatter.format(date);
  }

  function formatDecimal(value) {
    const numeric = parseNumeric(value);
    if (numeric === null) return "";
    return smallDecimalFormatter.format(numeric);
  }

  function matchesRange(value, range) {
    if (!range) return true;
    if (value === null) return false;
    if (typeof range.min === "number" && value < range.min) return false;
    if (typeof range.max === "number" && value > range.max) return false;
    return true;
  }

  function getDateInputValue(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
  }

  function formatWeight(value) {
    const numeric = parseNumeric(value);
    if (numeric === null) return "";
    return `${weightFormatter.format(numeric)} g`;
  }

  function formatFlourDetails(reference, fallbackName = "") {
    if (reference && typeof reference === "object") {
      const parts = [];
      if (reference.type) parts.push(reference.type);
      const proteinValue = parseNumeric(reference.protein);
      if (proteinValue !== null) {
        parts.push(`${decimalFormatter.format(proteinValue)}% prot`);
      }
      const strengthValue = parseNumeric(reference.strength);
      if (strengthValue !== null) {
        parts.push(`W ${Math.round(strengthValue)}`);
      }
      if (!reference.name && !fallbackName) {
        return parts.length ? parts.join(", ") : "";
      }
      if (!parts.length) {
        return reference.name || fallbackName;
      }
      return `${reference.name || fallbackName} (${parts.join(", ")})`;
    }
    return fallbackName || "";
  }

  function formatPrefermentSummary(preferment) {
    if (!preferment || preferment.enabled === false) return "";
    const parts = [];
    if (preferment.type) parts.push(preferment.type);
    const inoculationValue = parseNumeric(preferment.inoculation);
    if (inoculationValue !== null) {
      parts.push(`${decimalFormatter.format(inoculationValue)}% inoc.`);
    }
    const hydrationValue = parseNumeric(preferment.hydration);
    if (hydrationValue !== null) {
      parts.push(`${decimalFormatter.format(hydrationValue)}% hidr.`);
    }
    const flourShareValue = parseNumeric(preferment.percentage);
    if (flourShareValue !== null) {
      parts.push(`${decimalFormatter.format(flourShareValue)}% da farinha total`);
    }
    const maturationValue = parseNumeric(preferment.maturation);
    if (maturationValue !== null) {
      parts.push(`${decimalFormatter.format(maturationValue)}h maturação`);
    }
    if (preferment.totalWeight) {
      parts.push(`${formatWeight(preferment.totalWeight)}`);
    }
    return parts.join(" • ") || "Pré-fermento configurado";
  }

  function renderFlourBlendList(container, blend) {
    if (!container) return;
    container.innerHTML = "";
    if (!Array.isArray(blend) || !blend.length) {
      const fallback = document.createElement("li");
      fallback.textContent = "Blend não informado.";
      container.appendChild(fallback);
      return;
    }

    blend.forEach((item) => {
      const listItem = document.createElement("li");
      const parts = [];
      const percentageValue = parseNumeric(item.percentage);
      if (percentageValue !== null) {
        parts.push(`${decimalFormatter.format(percentageValue)}%`);
      }
      const name = item.name || "Farinha";
      const infoParts = [];
      if (item.reference?.type) infoParts.push(item.reference.type);
      const proteinValue = parseNumeric(item.reference?.protein);
      if (proteinValue !== null) {
        infoParts.push(`${decimalFormatter.format(proteinValue)}% prot`);
      }
      const strengthValue = parseNumeric(item.reference?.strength);
      if (strengthValue !== null) {
        infoParts.push(`W ${Math.round(strengthValue)}`);
      }
      const infoLabel = infoParts.length ? ` (${infoParts.join(", ")})` : "";
      parts.push(`${name}${infoLabel}`);
      const weightLabel = formatWeight(item.weight);
      if (weightLabel) {
        parts.push(weightLabel);
      }
      listItem.textContent = parts.join(" — ");
      container.appendChild(listItem);
    });
  }

  function renderFormulaList(container, details) {
    if (!container) return;
    container.innerHTML = "";
    if (!details || typeof details !== "object") {
      const fallback = document.createElement("li");
      fallback.textContent = "Sem dados de formulação.";
      container.appendChild(fallback);
      return;
    }

    const items = [];
    if (Number.isFinite(details.doughCount) && parseNumeric(details.doughBallWeight) !== null) {
      const ballWeightLabel = formatWeight(details.doughBallWeight);
      const totalLabel = formatWeight(details.targetDoughWeight ?? details.totalDoughWeight);
      const countLabel = Math.round(details.doughCount);
      const segments = [`Massas: ${countLabel} × ${ballWeightLabel}`];
      if (totalLabel) {
        segments.push(`= ${totalLabel}`);
      }
      items.push(segments.join(" "));
    }

    const formula = details.formula || {};
    const totals = formula.totals || {};
    const percentages = formula.percentages || {};

    const totalFlourWeight = parseNumeric(formula.totalFlour);
    if (totalFlourWeight !== null) {
      items.push(`Farinha total: ${formatWeight(totalFlourWeight)}`);
    }

    const waterWeight = parseNumeric(totals.water);
    if (waterWeight !== null) {
      const waterParts = [`Água: ${formatWeight(waterWeight)}`];
      const waterPct = formatPercentage(percentages.water);
      if (waterPct) waterParts.push(`(${waterPct})`);
      items.push(waterParts.join(" "));
    }

    const saltWeight = parseNumeric(totals.salt);
    if (saltWeight !== null) {
      const saltParts = [`Sal: ${formatWeight(saltWeight)}`];
      const saltPct = formatPercentage(percentages.salt);
      if (saltPct) saltParts.push(`(${saltPct})`);
      items.push(saltParts.join(" "));
    }

    const yeastWeight = parseNumeric(totals.yeast);
    if (yeastWeight !== null) {
      const yeastParts = [`Fermento: ${formatWeight(yeastWeight)}`];
      const yeastPct = formatPercentage(percentages.yeast);
      if (yeastPct) yeastParts.push(`(${yeastPct})`);
      items.push(yeastParts.join(" "));
    }

    const fatWeight = parseNumeric(totals.fat);
    if (fatWeight !== null) {
      const fatParts = [`Gordura: ${formatWeight(fatWeight)}`];
      const fatPct = formatPercentage(percentages.fat);
      if (fatPct) fatParts.push(`(${fatPct})`);
      items.push(fatParts.join(" "));
    }

    const sugarWeight = parseNumeric(totals.sugar);
    if (sugarWeight !== null) {
      const sugarParts = [`Açúcares: ${formatWeight(sugarWeight)}`];
      const sugarPct = formatPercentage(percentages.sugar);
      if (sugarPct) sugarParts.push(`(${sugarPct})`);
      items.push(sugarParts.join(" "));
    }

    const mixFlourWeight = parseNumeric(totals.mixFlour);
    const mixWaterWeight = parseNumeric(totals.mixWater);
    if (mixFlourWeight !== null || mixWaterWeight !== null) {
      const mixParts = [];
      if (mixFlourWeight !== null) mixParts.push(`farinha ${formatWeight(mixFlourWeight)}`);
      if (mixWaterWeight !== null) mixParts.push(`água ${formatWeight(mixWaterWeight)}`);
      if (mixParts.length) {
        items.push(`Massa final (antes dos demais ingredientes): ${mixParts.join(" + ")}`);
      }
    }

    if (details.preferment && typeof details.preferment === "object") {
      const prefermentWeight = formatWeight(details.preferment.totalWeight);
      const prefermentParts = [];
      if (details.preferment.type) prefermentParts.push(details.preferment.type);
      const inoculationValue = parseNumeric(details.preferment.inoculation);
      if (inoculationValue !== null) {
        prefermentParts.push(`${decimalFormatter.format(inoculationValue)}% inoc.`);
      }
      const hydrationValue = parseNumeric(details.preferment.hydration);
      if (hydrationValue !== null) {
        prefermentParts.push(`${decimalFormatter.format(hydrationValue)}% hidr.`);
      }
      const flourShare = parseNumeric(details.preferment.percentage);
      if (flourShare !== null) {
        prefermentParts.push(`${decimalFormatter.format(flourShare)}% da farinha total`);
      }
      const maturationValue = parseNumeric(details.preferment.maturation);
      if (maturationValue !== null) {
        prefermentParts.push(`${decimalFormatter.format(maturationValue)}h maturação`);
      }
      const breakdown = [];
      if (parseNumeric(details.preferment.flour) !== null) {
        breakdown.push(`farinha ${formatWeight(details.preferment.flour)}`);
      }
      if (parseNumeric(details.preferment.water) !== null) {
        breakdown.push(`água ${formatWeight(details.preferment.water)}`);
      }
      const breakdownLabel = breakdown.length ? ` (${breakdown.join(" + ")})` : "";
      const prefermentLabel = prefermentParts.length ? ` (${prefermentParts.join(" • ")})` : "";
      items.push(`Pré-fermento: ${prefermentWeight || "—"}${breakdownLabel}${prefermentLabel}`);
    }

    const totalDough = formatWeight(details.totalDoughWeight);
    if (totalDough) {
      items.push(`Massa total estimada: ${totalDough}`);
    }

    if (!items.length) {
      const fallback = document.createElement("li");
      fallback.textContent = "Sem dados de formulação.";
      container.appendChild(fallback);
      return;
    }

    items.forEach((text) => {
      const listItem = document.createElement("li");
      listItem.textContent = text;
      container.appendChild(listItem);
    });
  }

  function computeTotalFlourFromTargets({
    doughCount,
    doughWeight,
    waterPct,
    saltPct,
    fatPct,
    sugarPct,
    yeastWeight,
  }) {
    const count = parseNumeric(doughCount);
    const ballWeight = parseNumeric(doughWeight);
    const water = parseNumeric(waterPct);
    if (!count || !ballWeight || water === null) return null;

    const salt = parseNumeric(saltPct) ?? 0;
    const fat = parseNumeric(fatPct) ?? 0;
    const sugar = parseNumeric(sugarPct) ?? 0;
    const yeast = parseNumeric(yeastWeight) ?? 0;

    const totalDoughTarget = count * ballWeight;
    if (totalDoughTarget <= 0) return null;

    const percentageFactor = 1 + (water + salt + fat + sugar) / 100;
    if (percentageFactor <= 0) return null;

    const flour = (totalDoughTarget - yeast) / percentageFactor;
    if (!Number.isFinite(flour) || flour <= 0) return null;
    return flour;
  }

  function calculateAutoFlour() {
    if (!formulaTotalFlourInput) return;
    const flour = computeTotalFlourFromTargets({
      doughCount: formulaDoughCountInput?.value,
      doughWeight: formulaDoughWeightInput?.value,
      waterPct: formulaWaterInput?.value,
      saltPct: formulaSaltInput?.value,
      fatPct: formulaFatInput?.value,
      sugarPct: formulaSugarInput?.value,
      yeastWeight: formulaYeastInput?.value,
    });

    if (flour !== null) {
      const rounded = Math.round(flour);
      formulaTotalFlourInput.value = String(rounded);
      formulaTotalFlourInput.dataset.autoValue = String(rounded);
    } else if (formulaTotalFlourInput.dataset.autoValue) {
      delete formulaTotalFlourInput.dataset.autoValue;
    }
  }

  function getYeastSuggestionContext() {
    const method = recipeFermentationSelect?.value?.trim() ?? "";
    const time = parseNumeric(recipeFermentationTimeInput?.value);
    const temperatureType = recipeFermentationTempSelect?.value?.trim() ?? "";
    const hydration = parseNumeric(formulaWaterInput?.value);
    const ambientTemp = parseNumeric(
      recipeFermentationAmbientTempInput?.value
    );
    const controlledTemp = parseNumeric(
      recipeFermentationControlledTempInput?.value
    );
    const ambientDurationInput = parseNumeric(
      recipeFermentationAmbientDurationInput?.value
    );
    const totalTime = parseNumeric(recipeFermentationTimeInput?.value);

    let ambientDuration = ambientDurationInput;
    let controlledDuration = null;

    if (Number.isFinite(totalTime)) {
      if (temperatureType === "Mista") {
        if (
          ambientDuration === null ||
          ambientDuration <= 0 ||
          ambientDuration >= totalTime
        ) {
          ambientDuration = null;
        } else {
          controlledDuration = Math.max(totalTime - ambientDuration, 0);
        }
      } else if (temperatureType === "TA") {
        ambientDuration = totalTime;
        controlledDuration = 0;
      } else if (temperatureType === "TC") {
        ambientDuration = 0;
        controlledDuration = totalTime;
      }
    }

    return {
      method,
      time,
      totalTime,
      temperature: temperatureType,
      hydration,
      ambientTemp,
      controlledTemp,
      ambientDuration,
      controlledDuration,
    };
  }

  function resolveDurations(context) {
    const total =
      parseNumeric(context.totalTime) ??
      parseNumeric(context.time) ??
      null;
    let ambientDuration = parseNumeric(context.ambientDuration);
    let controlledDuration = parseNumeric(context.controlledDuration);

    if (context.temperature === "Mista") {
      if (ambientDuration === null && total !== null) {
        ambientDuration = total / 2;
      }
      if (controlledDuration === null && total !== null) {
        controlledDuration = Math.max(total - ambientDuration, 0);
      }
    } else if (total !== null) {
      if (context.temperature === "TA") {
        ambientDuration = total;
        controlledDuration = 0;
      } else if (context.temperature === "TC") {
        ambientDuration = 0;
        controlledDuration = total;
      }
    }

    const resolvedAmbient = ambientDuration ?? null;
    const resolvedControlled =
      controlledDuration ??
      (total !== null && resolvedAmbient !== null
        ? Math.max(total - resolvedAmbient, 0)
        : null);
    const resolvedTotal =
      total ??
      (resolvedAmbient ?? 0) +
        (resolvedControlled ?? 0);

    return {
      ambientDuration: resolvedAmbient,
      controlledDuration: resolvedControlled,
      totalDuration: resolvedTotal,
    };
  }

  function computeEffectiveTemperature(context) {
    const { temperature } = context;
    const { ambientDuration, controlledDuration, totalDuration } =
      resolveDurations(context);
    const ambient =
      parseNumeric(context.ambientTemp) ?? DEFAULT_TEMPERATURES.TA;
    const controlled =
      parseNumeric(context.controlledTemp) ?? DEFAULT_TEMPERATURES.TC;

    if (temperature === "TC") {
      return controlled;
    }
    if (temperature === "Mista") {
      const total = totalDuration ?? 0;
      if (!total || total <= 0) {
        return (ambient + controlled) / 2;
      }
      const ambientPortion = ambientDuration ?? total / 2;
      const controlledPortion =
        controlledDuration ?? Math.max(total - ambientPortion, 0);
      if (ambientPortion + controlledPortion === 0) {
        return (ambient + controlled) / 2;
      }
      return (
        (ambient * ambientPortion + controlled * controlledPortion) /
        (ambientPortion + controlledPortion)
      );
    }
    return ambient;
  }

  function computeDefaultEffectiveTemperature(context) {
    const { temperature } = context;
    const { ambientDuration, controlledDuration, totalDuration } =
      resolveDurations(context);
    const ambient = DEFAULT_TEMPERATURES.TA;
    const controlled = DEFAULT_TEMPERATURES.TC;

    if (temperature === "TC") {
      return controlled;
    }
    if (temperature === "Mista") {
      const total = totalDuration ?? 0;
      if (!total || total <= 0) {
        return (ambient + controlled) / 2;
      }
      const ambientPortion = ambientDuration ?? total / 2;
      const controlledPortion =
        controlledDuration ?? Math.max(total - ambientPortion, 0);
      if (ambientPortion + controlledPortion === 0) {
        return (ambient + controlled) / 2;
      }
      return (
        (ambient * ambientPortion + controlled * controlledPortion) /
        (ambientPortion + controlledPortion)
      );
    }
    return ambient;
  }

  function calculateYeastPercentage(context) {
    const { method, time, temperature, hydration } = context;
    if (!method || !temperature || time === null || time <= 0) {
      return null;
    }

    const hours = Number(time);
    const entry =
      YEAST_BASE_TABLE.find((item) => hours >= item.min) ??
      YEAST_BASE_TABLE[YEAST_BASE_TABLE.length - 1];
    let percentage = entry.base;

    const methodFactor = METHOD_FACTORS[method] ?? METHOD_FACTORS.Outros;
    percentage *= methodFactor;

    const defaultTemp = computeDefaultEffectiveTemperature(context);
    const effectiveTemp = computeEffectiveTemperature(context);
    if (
      defaultTemp !== null &&
      Number.isFinite(defaultTemp) &&
      effectiveTemp !== null &&
      Number.isFinite(effectiveTemp)
    ) {
      const delta = defaultTemp - effectiveTemp;
      const temperatureFactor = Math.pow(
        2,
        delta / TEMPERATURE_SENSITIVITY
      );
      percentage *= temperatureFactor;
    }

    const hydrationValue = hydration ?? 0;
    const hydrationAdjustment = Math.max(
      -0.05,
      Math.min((hydrationValue - 60) * 0.002, 0.05)
    );
    percentage = Math.max(
      percentage + hydrationAdjustment,
      MIN_YEAST_PERCENTAGE
    );

    return Math.min(percentage, MAX_YEAST_PERCENTAGE);
  }

  function formatYeastSuggestionMessage(context) {
    const {
      time,
      temperature,
      method,
      hydration,
      percentage,
      grams,
      ambientTemp,
      controlledTemp,
      ambientDuration,
      controlledDuration,
    } = context;
    const timeLabel = formatHours(time) || "Tempo não informado";
    const methodLabel = method || "Método indefinido";
    const hydrationLabel =
      hydration === null || hydration === undefined
        ? ""
        : `${decimalFormatter.format(hydration)}%`;

    const temperatureLabel = formatFermentationTemperature(
      temperature,
      {
        ambient: ambientTemp,
        controlled: controlledTemp,
        ambientDuration,
        controlledDuration,
      },
      time
    );

    const headerParts = [timeLabel, methodLabel];
    if (temperatureLabel) headerParts.push(temperatureLabel);
    if (hydrationLabel) headerParts.push(`Hidratação ${hydrationLabel}`);
    const header = headerParts.join(" • ");

    const percentLabel = `${decimalFormatter.format(percentage)}%`;
    const gramsLabel = formatWeight(grams);
    const perKg = Math.max(0, Math.round((percentage / 100) * 1000 * 10) / 10);
    const perKgLabel = `${smallDecimalFormatter.format(perKg)} g por kg`;

    return `${header} ⇒ ${percentLabel} (${gramsLabel} total / ${perKgLabel})`;
  }

  function handleYeastAutoClick() {
    calculateAutoFlour();
    resetYeastSuggestion();
    const context = getYeastSuggestionContext();
    const totalFlour = parseNumeric(formulaTotalFlourInput?.value);

    if (!context.method) {
      showFeedback("Selecione o método de fermentação para sugerir o fermento.");
      return;
    }

    if (!context.temperature) {
      showFeedback("Informe a temperatura da fermentação para sugerir o fermento.");
      return;
    }

    if (context.time === null || context.time <= 0) {
      showFeedback("Informe o tempo total de fermentação (valor maior que zero).");
      return;
    }

    if (context.hydration === null || context.hydration <= 0) {
      showFeedback("Informe a hidratação final desejada para sugerir o fermento.");
      return;
    }

    const ambientTempRaw = parseNumeric(
      recipeFermentationAmbientTempInput?.value
    );
    const controlledTempRaw = parseNumeric(
      recipeFermentationControlledTempInput?.value
    );
    const ambientDurationRaw = parseNumeric(
      recipeFermentationAmbientDurationInput?.value
    );

    switch (context.temperature) {
      case "TA": {
        if (ambientTempRaw === null || !Number.isFinite(ambientTempRaw)) {
          showFeedback("Informe a temperatura ambiente média (°C).");
          return;
        }
        context.ambientTemp = ambientTempRaw;
        context.controlledTemp = null;
        context.ambientDuration = context.time;
        context.controlledDuration = 0;
        break;
      }
      case "TC": {
        if (controlledTempRaw === null || !Number.isFinite(controlledTempRaw)) {
          showFeedback("Informe a temperatura da geladeira (°C).");
          return;
        }
        context.controlledTemp = controlledTempRaw;
        context.ambientTemp =
          ambientTempRaw === null || Number.isNaN(ambientTempRaw)
            ? null
            : ambientTempRaw;
        context.ambientDuration = 0;
        context.controlledDuration = context.time;
        break;
      }
      case "Mista": {
        if (ambientTempRaw === null || !Number.isFinite(ambientTempRaw)) {
          showFeedback("Informe a temperatura ambiente média (°C).");
          return;
        }
        if (controlledTempRaw === null || !Number.isFinite(controlledTempRaw)) {
          showFeedback("Informe a temperatura da geladeira (°C).");
          return;
        }
        if (
          ambientDurationRaw === null ||
          ambientDurationRaw <= 0 ||
          ambientDurationRaw >= context.time
        ) {
          showFeedback(
            "Informe o tempo em temperatura ambiente (maior que 0 e menor que o tempo total)."
          );
          return;
        }
        const controlledDuration = Math.max(
          context.time - ambientDurationRaw,
          0
        );
        if (controlledDuration <= 0) {
          showFeedback(
            "O tempo em temperatura controlada precisa ser maior que zero."
          );
          return;
        }
        context.ambientTemp = ambientTempRaw;
        context.controlledTemp = controlledTempRaw;
        context.ambientDuration = ambientDurationRaw;
        context.controlledDuration = controlledDuration;
        break;
      }
      default: {
        showFeedback("Informe a temperatura da fermentação para sugerir o fermento.");
        return;
      }
    }

    if (totalFlour === null || totalFlour <= 0) {
      showFeedback("A farinha total precisa ser calculada antes da sugestão.");
      return;
    }

    const percentage = calculateYeastPercentage(context);
    if (percentage === null) {
      showFeedback("Não foi possível calcular a sugestão de fermento.");
      return;
    }

    const grams = Math.max(0, Math.round(((percentage / 100) * totalFlour) * 10) / 10);
    formulaYeastInput.value = String(grams);
    calculateAutoFlour();

    state.yeastSuggestion = {
      ...context,
      percentage,
      grams,
      flour: totalFlour,
      isStale: false,
    };

    const message = formatYeastSuggestionMessage({
      ...context,
      percentage,
      grams,
    });

    if (formulaYeastFeedback) {
      formulaYeastFeedback.textContent = message;
    }
    if (formulaYeastWarning) {
      formulaYeastWarning.classList.add("is-hidden");
    }
  }

  function markYeastSuggestionStale() {
    if (!state.yeastSuggestion) return;
    const current = getYeastSuggestionContext();
    const previous = state.yeastSuggestion;

    if (
      !current.method ||
      !current.temperature ||
      current.time === null ||
      current.time <= 0 ||
      current.hydration === null ||
      current.hydration <= 0
    ) {
      if (formulaYeastWarning) {
        formulaYeastWarning.classList.add("is-hidden");
      }
      state.yeastSuggestion.isStale = true;
      return;
    }

    const contextsMatch =
      current.method === previous.method &&
      current.temperature === previous.temperature &&
      nearlyEqual(current.time, previous.time) &&
      nearlyEqual(current.hydration, previous.hydration) &&
      nearlyEqual(current.ambientTemp, previous.ambientTemp) &&
      nearlyEqual(current.controlledTemp, previous.controlledTemp) &&
      nearlyEqual(current.ambientDuration, previous.ambientDuration) &&
      nearlyEqual(current.controlledDuration, previous.controlledDuration);
    if (contextsMatch) {
      if (formulaYeastWarning) {
        formulaYeastWarning.classList.add("is-hidden");
      }
      state.yeastSuggestion.isStale = false;
    } else {
      if (formulaYeastWarning) {
        formulaYeastWarning.classList.remove("is-hidden");
      }
      state.yeastSuggestion.isStale = true;
    }
  }

  function resetYeastSuggestion() {
    state.yeastSuggestion = null;
    if (formulaYeastFeedback) {
      formulaYeastFeedback.textContent = "";
    }
    if (formulaYeastWarning) {
      formulaYeastWarning.classList.add("is-hidden");
    }
  }

  function getRecipeDetails(recipe) {
    const fermentationDetails = recipe.fermentation && typeof recipe.fermentation === "object"
      ? recipe.fermentation
      : {};
    const fermentation =
      fermentationDetails.method ??
      recipe.fermentationMethod ??
      recipe.recipeFermentation ??
      recipe.dough ??
      "";
    const fermentationTime =
      fermentationDetails.totalTime ??
      recipe.fermentationTime ??
      recipe.recipeFermentationTime ??
      recipe.totalFermentationHours;
    const preferment =
      fermentationDetails.preferment ?? recipe.preferment ?? null;
    const fermentationTemperature =
      fermentationDetails.temperature ??
      recipe.fermentationTemperature ??
      recipe.temperature ??
      "";
    const fermentationTemperatureDetails =
      fermentationDetails.temperatureDetails &&
      typeof fermentationDetails.temperatureDetails === "object"
        ? fermentationDetails.temperatureDetails
        : recipe.fermentationTemperatureDetails &&
          typeof recipe.fermentationTemperatureDetails === "object"
        ? recipe.fermentationTemperatureDetails
        : recipe.temperatureDetails &&
          typeof recipe.temperatureDetails === "object"
        ? recipe.temperatureDetails
        : null;
    const fermentationTemperatureLabel = formatFermentationTemperature(
      fermentationTemperature,
      fermentationTemperatureDetails,
      fermentationTime
    );

    const style =
      recipe.style ?? recipe.recipeStyle ?? recipe.targetStyle ?? "";

    const flourReference =
      recipe.flourReference && typeof recipe.flourReference === "object"
        ? recipe.flourReference
        : recipe.flourData && typeof recipe.flourData === "object"
        ? recipe.flourData
        : null;
    const flourBlend = Array.isArray(recipe.flourBlend)
      ? recipe.flourBlend.map((item) => ({
          ...item,
          percentage: parseNumeric(item.percentage),
          weight: parseNumeric(item.weight),
        }))
      : [];
    const flourBlendSummary = flourBlend.length
      ? flourBlend
          .map((item) => {
            const percentageLabel =
              item.percentage === null || item.percentage === undefined
                ? ""
                : `${decimalFormatter.format(item.percentage)}% `;
            return `${percentageLabel}${item.name || "Farinha"}`.trim();
          })
          .join(" • ")
      : "";
    const flourName =
      flourBlend.length === 1
        ? flourBlend[0].name
        : recipe.flour ?? recipe.recipeFlour ?? flourReference?.name ?? "";
    const flourLabel = flourBlendSummary || formatFlourDetails(flourReference, flourName);

    const rawFormula =
      recipe.formula && typeof recipe.formula === "object"
        ? recipe.formula
        : {};
    const formula = {
      ...rawFormula,
      percentages: { ...(rawFormula.percentages || {}) },
      totals: { ...(rawFormula.totals || {}) },
    };
    const hydration =
      parseNumeric(formula.percentages?.water) ??
      recipe.hydration ??
      recipe.recipeHydration ??
      recipe.hydrationPercentage;
    const totalDoughWeight =
      parseNumeric(
        formula.totals?.totalDoughWeight ??
        formula.totalDoughWeight ??
          formula.totals?.totalWeight
      );

    const rawFormulation =
      recipe.formulation && typeof recipe.formulation === "object"
        ? recipe.formulation
        : rawFormula.meta && typeof rawFormula.meta === "object"
        ? rawFormula.meta
        : {};

    const doughCount = parseNumeric(rawFormulation.doughCount);
    const doughBallWeight = parseNumeric(
      rawFormulation.doughBallWeight ?? rawFormulation.ballWeight
    );
    let targetDoughWeight = parseNumeric(
      rawFormulation.targetDoughWeight ?? rawFormulation.targetWeight
    );
    if (
      targetDoughWeight === null &&
      doughCount &&
      doughBallWeight !== null &&
      doughBallWeight > 0
    ) {
      targetDoughWeight = doughCount * doughBallWeight;
    }
    formula.meta = {
      ...formula.meta,
      doughCount: Number.isFinite(doughCount) ? doughCount : null,
      doughBallWeight:
        doughBallWeight !== null && Number.isFinite(doughBallWeight)
          ? doughBallWeight
          : null,
      targetDoughWeight:
        targetDoughWeight !== null && Number.isFinite(targetDoughWeight)
          ? targetDoughWeight
          : null,
    };

    const notes =
      recipe.notes ??
      recipe.recipeNotes ??
      recipe.instructions ??
      recipe.ingredients ??
      "";

    let photo = recipe.photo ?? null;
    if (photo && typeof photo === "string") {
      photo = { dataUrl: photo };
    }

    const prefermentLabel = formatPrefermentSummary(preferment);

    return {
      style,
      fermentation,
      fermentationTemperature,
      fermentationTemperatureLabel,
      temperatureDetails: fermentationTemperatureDetails,
      flour: flourName,
      flourLabel,
      flourBlend,
      flourBlendSummary,
      hydration: parseNumeric(hydration),
      fermentationTime: parseNumeric(fermentationTime),
      notes,
      photo,
      preferment,
      prefermentLabel,
      totalDoughWeight,
      doughCount,
      doughBallWeight,
      targetDoughWeight,
      flourReference,
      formula,
    };
  }

  function clearPhotoPreview() {
    if (!photoPreview || !photoPreviewImage) return;
    photoPreviewImage.src = "";
    photoPreviewImage.alt = "Pré-visualização da foto da pizza";
    photoPreview.classList.add("is-hidden");
    state.pendingPhoto = null;
    if (recipePhotoInput) {
      recipePhotoInput.value = "";
    }
  }

  function updatePhotoPreview(photo) {
    if (!photoPreview || !photoPreviewImage) return;
    if (!photo || !photo.dataUrl) {
      clearPhotoPreview();
      return;
    }

    photoPreviewImage.src = photo.dataUrl;
    photoPreviewImage.alt = photo.name
      ? `Pré-visualização da pizza ${photo.name}`
      : "Pré-visualização da pizza";
    photoPreview.classList.remove("is-hidden");
  }

  function hideSuccessSummary() {
    if (!successPanel) return;
    successPanel.classList.add("is-hidden");
    successPanel.setAttribute("hidden", "hidden");
  }

  function showSuccessSummary(recipe) {
    if (!successPanel) return;
    const details = getRecipeDetails(recipe);

    if (successRecipeName) {
      successRecipeName.textContent = recipe.name || "—";
    }
    if (successRecipeStyle) {
      successRecipeStyle.textContent = details.style || "—";
    }
    if (successRecipeFlour) {
      successRecipeFlour.textContent =
        details.flourLabel || details.flour || "—";
    }
    if (successRecipeFermentation) {
      successRecipeFermentation.textContent =
        details.fermentation || "—";
    }
    if (successRecipeTemperature) {
      successRecipeTemperature.textContent =
        details.fermentationTemperatureLabel || "—";
    }
    if (successRecipeHydration) {
      const hydrationLabel = formatPercentage(details.hydration);
      successRecipeHydration.textContent = hydrationLabel || "—";
    }
    if (successRecipeTotalDough) {
      const totalDoughLabel = formatWeight(details.totalDoughWeight);
      successRecipeTotalDough.textContent = totalDoughLabel || "—";
    }
    if (successRecipePreferment) {
      successRecipePreferment.textContent =
        details.prefermentLabel || "Sem pré-fermento";
    }
    if (successRecipeTime) {
      const timeLabel = formatHours(details.fermentationTime);
      successRecipeTime.textContent = timeLabel || "—";
    }

    renderFlourBlendList(successFlourBlendList, details.flourBlend);

    renderFormulaList(successFormulaList, details);

    successPanel.classList.remove("is-hidden");
    successPanel.removeAttribute("hidden");
  }

  function renderRecipeList(recipes) {
    if (!recipeListContainer) return;
    recipeListContainer.innerHTML = "";

    if (!Array.isArray(recipes) || !recipes.length) {
      recipeListContainer.className = "recipes-empty";
      recipeListContainer.innerHTML =
        "<p>Nenhuma receita cadastrada ainda.</p>";
      return;
    }

    recipeListContainer.className = "recipe-grid";

    const templateRoot = recipeTemplate?.content?.firstElementChild ?? null;

    recipes
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .forEach((recipe) => {
        const article = templateRoot
          ? templateRoot.cloneNode(true)
          : document.createElement("article");

        if (!templateRoot) {
          article.className = "recipe-card";
          article.innerHTML = `
            <header class="recipe-card__header">
              <div>
                <h3 class="recipe-card__title"></h3>
                <p class="recipe-card__meta"></p>
              </div>
              <strong class="recipe-card__average"></strong>
            </header>
            <dl class="recipe-card__summary"></dl>
            <footer class="recipe-card__footer">
              <button type="button" class="recipe-card__evaluate">Avaliar</button>
              <button type="button" class="recipe-card__details">Ver detalhes</button>
              <button type="button" class="recipe-card__delete ghost">Apagar receita</button>
            </footer>
          `;
        }

        const titleElement = article.querySelector(".recipe-card__title");
        if (titleElement) {
          titleElement.textContent = recipe.name || "Receita sem nome";
        }

        const metaElement = article.querySelector(".recipe-card__meta");
        if (metaElement) {
          const createdLabel = recipe.createdAt
            ? `Criada em ${formatDate(recipe.createdAt)}`
            : "Criação não informada";
          metaElement.textContent = createdLabel;
        }

        const averageLabel = article.querySelector(".recipe-card__average");
        if (averageLabel) {
          const average = computeAverageScore(recipe.ratings);
          averageLabel.textContent = average
            ? `Nota média: ${average}`
            : "Sem avaliações";
        }

        const details = getRecipeDetails(recipe);

        const summaryElement = article.querySelector(".recipe-card__summary");
        if (summaryElement) {
          summaryElement.innerHTML = "";
          const summaryItems = [];

          summaryItems.push(["Estilo", details.style]);
          summaryItems.push(["Farinha", details.flourLabel || details.flour]);
          summaryItems.push(["Fermentação", details.fermentation]);

          const timeLabel = formatHours(details.fermentationTime);
          if (timeLabel) summaryItems.push(["Tempo total", timeLabel]);

          const hydrationLabel = formatPercentage(details.hydration);
          if (hydrationLabel) summaryItems.push(["Hidratação", hydrationLabel]);

          if (
            Number.isFinite(details.doughCount) &&
            parseNumeric(details.doughBallWeight) !== null
          ) {
            const countLabel = Math.round(details.doughCount);
            const ballWeightLabel = formatWeight(details.doughBallWeight);
            const totalLabel = formatWeight(
              details.targetDoughWeight ?? details.totalDoughWeight
            );
            const massesLabel = totalLabel
              ? `${countLabel} × ${ballWeightLabel} = ${totalLabel}`
              : `${countLabel} × ${ballWeightLabel}`;
            summaryItems.push(["Massas", massesLabel]);
          }

          summaryItems
            .filter(([, value]) => Boolean(value))
            .slice(0, 6)
            .forEach(([label, value]) => {
              const row = document.createElement("div");
              const term = document.createElement("dt");
              const desc = document.createElement("dd");
              term.textContent = label;
              desc.textContent = value;
              row.append(term, desc);
              summaryElement.appendChild(row);
            });

          if (!summaryElement.children.length) {
            const row = document.createElement("div");
            const term = document.createElement("dt");
            const desc = document.createElement("dd");
            term.textContent = "Resumo";
            desc.textContent = "Nenhum dado disponível.";
            row.append(term, desc);
            summaryElement.appendChild(row);
          }
        }

        const evaluateButton = article.querySelector(".recipe-card__evaluate");
        if (evaluateButton) {
          evaluateButton.addEventListener("click", () =>
            openRecipeDetail(recipe, { focusEvaluation: true })
          );
        }

        const detailsButton = article.querySelector(".recipe-card__details");
        if (detailsButton) {
          detailsButton.addEventListener("click", () => openRecipeDetail(recipe));
        }

        const deleteButton = article.querySelector(".recipe-card__delete");
        if (deleteButton) {
          deleteButton.addEventListener("click", () => handleRecipeDelete(recipe));
        }

        recipeListContainer.appendChild(article);
      });
  }

  function populateRecipeDetail(
    recipe,
    { preserveEvaluationMessage = false, keepEvaluationInputs = false } = {}
  ) {
    if (!recipe || !recipeDetailDialog) return;
    activeRecipeDetail = recipe;

    const ratings = Array.isArray(recipe.ratings) ? recipe.ratings : [];
    const details = getRecipeDetails(recipe);

    if (recipeDetailTitle) {
      recipeDetailTitle.textContent = recipe.name || "Receita sem nome";
    }

    if (recipeDetailMeta) {
      const metaParts = [];
      if (recipe.createdAt) {
        metaParts.push(`Criada em ${formatDate(recipe.createdAt)}`);
      }
      if (details.style) {
        metaParts.push(`Estilo ${details.style}`);
      }
      const average = computeAverageScore(ratings);
      if (average) {
        const count = ratings.length;
        const suffix = count === 1 ? "avaliação" : "avaliações";
        metaParts.push(`Nota média ${average} (${count} ${suffix})`);
      }
      recipeDetailMeta.textContent =
        metaParts.join(" • ") || "Sem informações adicionais";
    }

    if (recipeDetailPhoto) {
      if (details.photo && details.photo.dataUrl) {
        if (recipeDetailPhotoImage) {
          recipeDetailPhotoImage.src = details.photo.dataUrl;
          recipeDetailPhotoImage.alt = recipe.name
            ? `Pizza ${recipe.name}`
            : "Foto da pizza registrada";
        }
        recipeDetailPhoto.classList.remove("is-hidden");
      } else {
        if (recipeDetailPhotoImage) {
          recipeDetailPhotoImage.src = "";
          recipeDetailPhotoImage.alt = "Foto da pizza registrada";
        }
        recipeDetailPhoto.classList.add("is-hidden");
      }
    }

    if (recipeDetailFacts) {
      recipeDetailFacts.innerHTML = "";
      const facts = [];
      facts.push(["Estilo", details.style]);
      facts.push(["Farinha", details.flourLabel || details.flour]);
      facts.push(["Fermentação", details.fermentation]);
      facts.push(["Temperatura", details.fermentationTemperatureLabel]);
      if (
        Number.isFinite(details.doughCount) &&
        parseNumeric(details.doughBallWeight) !== null
      ) {
        const countLabel = Math.round(details.doughCount);
        const ballWeightLabel = formatWeight(details.doughBallWeight);
        const totalLabel = formatWeight(
          details.targetDoughWeight ?? details.totalDoughWeight
        );
        const massesLabel = totalLabel
          ? `${countLabel} × ${ballWeightLabel} = ${totalLabel}`
          : `${countLabel} × ${ballWeightLabel}`;
        facts.push(["Massas", massesLabel]);
      }
      facts.push(["Pré-fermento", details.prefermentLabel]);
      facts.push(["Hidratação", formatPercentage(details.hydration)]);
      facts.push(["Massa total", formatWeight(details.totalDoughWeight)]);
      facts.push(["Tempo total", formatHours(details.fermentationTime)]);

      facts
        .filter(([, value]) => Boolean(value))
        .forEach(([label, value]) => {
          const row = document.createElement("div");
          const term = document.createElement("dt");
          const desc = document.createElement("dd");
          term.textContent = label;
          desc.textContent = value;
          row.append(term, desc);
          recipeDetailFacts.appendChild(row);
        });

      if (!recipeDetailFacts.children.length) {
        const row = document.createElement("div");
        const term = document.createElement("dt");
        const desc = document.createElement("dd");
        term.textContent = "Resumo";
        desc.textContent = "Nenhum detalhe registrado ainda.";
        row.append(term, desc);
        recipeDetailFacts.appendChild(row);
      }
    }

    if (recipeDetailNotesSection && recipeDetailNotes) {
      if (details.notes) {
        recipeDetailNotes.textContent = details.notes;
        recipeDetailNotesSection.classList.remove("is-hidden");
      } else {
        recipeDetailNotes.textContent = "";
        recipeDetailNotesSection.classList.add("is-hidden");
      }
    }

    renderFlourBlendList(recipeDetailBlendList, details.flourBlend);
    renderFormulaList(recipeDetailFormulaList, details);

    if (recipeDetailRatingsList) {
      recipeDetailRatingsList.innerHTML = "";
      if (ratings.length) {
        ratings
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .forEach((rating) => {
            const item = document.createElement("li");
            item.textContent = `${formatDate(rating.date)} — Nota ${
              rating.score
            }${rating.notes ? ` • ${rating.notes}` : ""}`;
            recipeDetailRatingsList.appendChild(item);
          });
      } else {
        const item = document.createElement("li");
        item.textContent = "Sem avaliações registradas.";
        recipeDetailRatingsList.appendChild(item);
      }
    }

    if (recipeDetailEvaluationForm) {
      recipeDetailEvaluationForm.dataset.recipeId = recipe.id;
      if (!keepEvaluationInputs) {
        if (recipeDetailEvaluationForm instanceof HTMLFormElement) {
          recipeDetailEvaluationForm.reset();
        }
        if (recipeDetailEvaluationRating) recipeDetailEvaluationRating.value = "";
        if (recipeDetailEvaluationNotes) recipeDetailEvaluationNotes.value = "";
      }
    }
    if (!preserveEvaluationMessage && recipeDetailEvaluationFeedback) {
      recipeDetailEvaluationFeedback.textContent = "";
    }

    if (recipeDetailDeleteButton) {
      recipeDetailDeleteButton.onclick = () => handleRecipeDelete(recipe);
    }
  }

  function openRecipeDetail(recipe, { focusEvaluation = false } = {}) {
    if (!recipe || !recipeDetailDialog) return;
    populateRecipeDetail(recipe);
    if (!recipeDetailDialog.open) {
      try {
        recipeDetailDialog.showModal();
      } catch (err) {
        if (typeof recipeDetailDialog.show === "function") {
          recipeDetailDialog.show();
        } else {
          console.warn("Dialog API não suportada:", err);
        }
      }
    }
    if (focusEvaluation && recipeDetailEvaluationRating) {
      recipeDetailEvaluationRating.focus();
    }
  }

  function closeRecipeDetail() {
    if (!recipeDetailDialog) return;
    if (recipeDetailDialog.open) {
      recipeDetailDialog.close();
    }
    activeRecipeDetail = null;
  }

  function syncUI() {
    renderRecipeList(state.recipes);
    if (activeRecipeDetail) {
      const latest = state.recipes.find(
        (item) => item.id === activeRecipeDetail.id
      );
      if (latest) {
        populateRecipeDetail(latest, {
          preserveEvaluationMessage: true,
          keepEvaluationInputs: true,
        });
      }
    }
  }

  function isFlourFilterActive() {
    return Object.values(state.flourFilters).some((value) => value !== "all");
  }

  function getFilteredFlours() {
    return state.flours.filter((flour) => {
      const typeFilter = state.flourFilters.type;
      const proteinFilter = state.flourFilters.protein;
      const strengthFilter = state.flourFilters.strength;

      const matchesType =
        typeFilter === "all" || (flour.type || "") === typeFilter;

      const proteinValue =
        flour.protein === null || flour.protein === undefined
          ? null
          : parseNumeric(flour.protein);
      const strengthValue =
        flour.strength === null || flour.strength === undefined
          ? null
          : parseNumeric(flour.strength);

      const matchesProtein = matchesRange(
        proteinValue,
        flourProteinRanges[proteinFilter]
      );
      const matchesStrength = matchesRange(
        strengthValue,
        flourStrengthRanges[strengthFilter]
      );

      return matchesType && matchesProtein && matchesStrength;
    });
  }

  function updateFlourTypeFilterOptions() {
    if (!flourFilterType) return;
    const previous = state.flourFilters.type;
    flourFilterType.innerHTML = '<option value="all">Todos os tipos</option>';

    const uniqueTypes = Array.from(
      new Set(
        state.flours
          .map((flour) => (flour.type || "").trim())
          .filter((type) => Boolean(type))
      )
    ).sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));

    uniqueTypes.forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      flourFilterType.appendChild(option);
    });

    if (previous !== "all" && uniqueTypes.includes(previous)) {
      flourFilterType.value = previous;
    } else {
      state.flourFilters.type = "all";
      flourFilterType.value = "all";
    }
  }

  function createFlourCard(flour) {
    const cloneSource = flourCardTemplate?.content?.firstElementChild ?? null;
    const card = cloneSource
      ? cloneSource.cloneNode(true)
      : document.createElement("article");

    if (!cloneSource) {
      card.className = "flour-card";
      const title = document.createElement("h3");
      title.textContent = flour.name || "Farinha sem nome";
      card.appendChild(title);
      const paragraph = document.createElement("p");
      const proteinLabel = formatPercentage(flour.protein) || "—";
      const strengthLabel =
        parseNumeric(flour.strength) !== null
          ? smallDecimalFormatter.format(parseNumeric(flour.strength))
          : "—";
      paragraph.textContent = `Tipo: ${flour.type || "—"} • Proteína: ${
        proteinLabel || "—"
      } • W: ${strengthLabel}`;
      card.appendChild(paragraph);
      const editFallback = document.createElement("button");
      editFallback.type = "button";
      editFallback.textContent = "Editar";
      editFallback.className = "flour-card__edit";
      editFallback.addEventListener("click", () => openFlourForm(flour));
      card.appendChild(editFallback);
      const deleteFallback = document.createElement("button");
      deleteFallback.type = "button";
      deleteFallback.textContent = "Apagar";
      deleteFallback.className = "flour-card__delete";
      deleteFallback.addEventListener("click", () => handleFlourDelete(flour));
      card.appendChild(deleteFallback);
      return card;
    }

    const title = card.querySelector(".flour-card__title");
    if (title) {
      title.textContent = flour.name || "Farinha sem nome";
    }

    const meta = card.querySelector(".flour-card__meta");
    if (meta) {
      const referenceDate = flour.updatedAt ?? flour.createdAt;
      if (referenceDate) {
        const label = flour.updatedAt
          ? `Atualizada em ${formatDateOnly(referenceDate)}`
          : `Cadastrada em ${formatDateOnly(referenceDate)}`;
        meta.textContent = label;
        meta.classList.remove("is-hidden");
      } else {
        meta.textContent = "";
        meta.classList.add("is-hidden");
      }
    }

    const typeElement = card.querySelector(".flour-card__type");
    if (typeElement) {
      typeElement.textContent = flour.type || "—";
    }

    const proteinElement = card.querySelector(".flour-card__protein");
    if (proteinElement) {
      const proteinLabel = formatPercentage(flour.protein);
      proteinElement.textContent = proteinLabel || "—";
    }

    const strengthElement = card.querySelector(".flour-card__strength");
    if (strengthElement) {
      const strengthValue = parseNumeric(flour.strength);
      strengthElement.textContent =
        strengthValue !== null
          ? smallDecimalFormatter.format(strengthValue)
          : "—";
    }

    const detailsElement = card.querySelector(".flour-card__details");
    let hasDetails = false;
    const detailValues = [
      [".flour-card__pl", formatDecimal(flour.pl)],
      [".flour-card__absorption", formatPercentage(flour.absorption)],
      [".flour-card__milling", flour.milling || ""],
      [".flour-card__expiration", formatDateOnly(flour.expirationDate)],
      [".flour-card__notes", flour.notes || ""],
    ];

    detailValues.forEach(([selector, value]) => {
      const element = card.querySelector(selector);
      if (!element) return;
      const row = element.closest("div");
      if (value) {
        element.textContent = value;
        row?.classList.remove("is-hidden");
        hasDetails = true;
      } else {
        element.textContent = "—";
        row?.classList.add("is-hidden");
      }
    });

    if (detailsElement) {
      detailsElement.classList.toggle("is-hidden", !hasDetails);
      detailsElement.toggleAttribute("hidden", !hasDetails);
      if (!hasDetails) {
        detailsElement.removeAttribute("open");
      }
    }

    const editButton = card.querySelector(".flour-card__edit");
    if (editButton) {
      editButton.dataset.id = flour.id;
      editButton.addEventListener("click", () => {
        const latest = state.flours.find((item) => item.id === flour.id) ?? flour;
        openFlourForm(latest);
      });
    }

    const deleteButton = card.querySelector(".flour-card__delete");
    if (deleteButton) {
      deleteButton.dataset.id = flour.id;
      deleteButton.addEventListener("click", () => handleFlourDelete(flour));
    }

    return card;
  }

  function renderFlourList() {
    if (!flourListContainer) return;
    const filtered = getFilteredFlours();
    const filtersActive = isFlourFilterActive();
    flourListContainer.innerHTML = "";

    if (!filtered.length) {
      flourListContainer.classList.add("flour-list--empty");
      const message = filtersActive
        ? "Nenhuma farinha encontrada para os filtros selecionados."
        : "Nenhuma farinha cadastrada ainda.";
      if (flourEmptyMessage) {
        flourEmptyMessage.textContent = message;
        flourListContainer.appendChild(flourEmptyMessage);
      } else {
        const paragraph = document.createElement("p");
        paragraph.textContent = message;
        flourListContainer.appendChild(paragraph);
      }
      return;
    }

    flourListContainer.classList.remove("flour-list--empty");

    filtered
      .slice()
      .sort((a, b) => {
        const valueA = new Date(a.updatedAt ?? a.createdAt ?? 0).getTime();
        const valueB = new Date(b.updatedAt ?? b.createdAt ?? 0).getTime();
        return valueB - valueA;
      })
      .forEach((flour) => {
        const card = createFlourCard(flour);
        flourListContainer.appendChild(card);
      });
  }

  function populateFlourForm(flour) {
    if (!flourForm) return;
    const controls = flourForm.elements;
    const assignValue = (name, value) => {
      const field = controls.namedItem(name);
      if (!field) return;
      const stringValue =
        value === null || value === undefined ? "" : value.toString();
      field.value = stringValue;
    };

    assignValue("flourName", flour?.name ?? "");
    assignValue("flourType", flour?.type ?? "");
    assignValue("flourProtein", flour?.protein ?? "");
    assignValue("flourStrength", flour?.strength ?? "");
    assignValue("flourPL", flour?.pl ?? "");
    assignValue("flourAbsorption", flour?.absorption ?? "");
    assignValue("flourMilling", flour?.milling ?? "");
    assignValue("flourNotes", flour?.notes ?? "");
    const expirationField = controls.namedItem("flourExpiration");
    if (expirationField) {
      expirationField.value = getDateInputValue(flour?.expirationDate);
    }
  }

  function openFlourForm(flour = null) {
    if (!flourFormContainer || !flourForm || !flourFormTitle || !flourFormSubmit) {
      return;
    }

    flourForm.reset();
    const isEditing = Boolean(flour && flour.id);
    state.editingFlourId = isEditing ? flour.id : null;
    flourFormTitle.textContent = isEditing ? "Editar Farinha" : "Nova Farinha";
    flourFormSubmit.textContent = isEditing ? "Salvar alterações" : "Salvar farinha";

    populateFlourForm(flour);

    flourFormContainer.classList.remove("is-hidden");
    flourFormContainer.removeAttribute("hidden");
    window.requestAnimationFrame(() => {
      const nameInput = flourForm.querySelector("#flour-name");
      nameInput?.focus();
      if (nameInput && nameInput instanceof HTMLInputElement) {
        nameInput.select();
      }
      flourFormContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function closeFlourForm() {
    if (!flourFormContainer || !flourForm || !flourFormTitle || !flourFormSubmit) {
      return;
    }
    flourForm.reset();
    flourFormTitle.textContent = "Nova Farinha";
    flourFormSubmit.textContent = "Salvar farinha";
    state.editingFlourId = null;
    flourFormContainer.classList.add("is-hidden");
    flourFormContainer.setAttribute("hidden", "hidden");
  }

  function handleFlourFormSubmit(event) {
    event.preventDefault();
    if (!flourForm) return;

    const formData = new FormData(event.currentTarget);
    const name = (formData.get("flourName") || "").toString().trim();
    const type = (formData.get("flourType") || "").toString().trim();
    const protein = parseNumeric(formData.get("flourProtein"));
    const strength = parseNumeric(formData.get("flourStrength"));
    const pl = parseNumeric(formData.get("flourPL"));
    const absorption = parseNumeric(formData.get("flourAbsorption"));
    const milling = (formData.get("flourMilling") || "").toString().trim();
    const notes = (formData.get("flourNotes") || "").toString().trim();
    const expirationRaw = (formData.get("flourExpiration") || "").toString().trim();

    if (!name) {
      showFeedback("Dê um nome para identificar a farinha.");
      return;
    }

    if (!type) {
      showFeedback("Informe o tipo da farinha (00, integral, importada...).");
      return;
    }

    if (protein !== null && (protein < 0 || protein > 20)) {
      showFeedback("Informe uma proteína válida entre 0% e 20%.");
      return;
    }

    if (strength !== null && strength < 0) {
      showFeedback("A força W deve ser um valor positivo.");
      return;
    }

    if (pl !== null && pl < 0) {
      showFeedback("O valor de P/L deve ser positivo.");
      return;
    }

    if (absorption !== null && (absorption < 0 || absorption > 100)) {
      showFeedback("A absorção deve estar entre 0% e 100%.");
      return;
    }

    let expirationDate = null;
    if (expirationRaw) {
      const parsed = new Date(`${expirationRaw}T00:00:00`);
      if (Number.isNaN(parsed.getTime())) {
        showFeedback("Informe uma data de validade válida.");
        return;
      }
      expirationDate = parsed.toISOString();
    }

    const timestamp = new Date().toISOString();
    const isEditing = Boolean(state.editingFlourId);

    if (isEditing) {
      const index = state.flours.findIndex((item) => item.id === state.editingFlourId);
      if (index === -1) {
        showFeedback("Farinha não encontrada. Tente novamente.");
        closeFlourForm();
        return;
      }
      const current = state.flours[index];
      state.flours[index] = {
        ...current,
        name,
        type,
        protein,
        strength,
        pl,
        absorption,
        milling,
        notes,
        expirationDate,
        updatedAt: timestamp,
      };
      flourStorage.save(state.flours);
      updateFlourTypeFilterOptions();
      renderFlourList();
      updateAllBlendSelectOptions();
      updateBlendTotal();
      closeFlourForm();
      showFeedback(`Farinha "${name}" atualizada.`);
      return;
    }

    const flour = {
      id: crypto.randomUUID(),
      name,
      type,
      protein,
      strength,
      pl,
      absorption,
      milling,
      notes,
      expirationDate,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    state.flours.push(flour);
    flourStorage.save(state.flours);
    updateFlourTypeFilterOptions();
    renderFlourList();
    updateAllBlendSelectOptions();
    updateBlendTotal();
    closeFlourForm();
    showFeedback(`Farinha "${name}" cadastrada.`);
  }

  function handleFlourFiltersChange(event) {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;
    const { name, value } = target;
    if (!(name in state.flourFilters)) return;
    state.flourFilters[name] = value;
    renderFlourList();
  }

  function handleFlourFiltersReset(event) {
    event.preventDefault();
    state.flourFilters = {
      type: "all",
      protein: "all",
      strength: "all",
    };
    if (flourFilterType) flourFilterType.value = "all";
    if (flourFilterProtein) flourFilterProtein.value = "all";
    if (flourFilterStrength) flourFilterStrength.value = "all";
    renderFlourList();
  }

  function handleRecipeDelete(recipe) {
    if (!recipe || !recipe.id) return;
    const label = recipe.name || "Receita sem nome";
    const shouldRemove = window.confirm(
      `Apagar "${label}"? Essa ação não pode ser desfeita.`
    );
    if (!shouldRemove) return;

    if (activeRecipeDetail && activeRecipeDetail.id === recipe.id) {
      closeRecipeDetail();
    }

    state.recipes = state.recipes.filter((item) => item.id !== recipe.id);
    safeStorage.save(state.recipes);
    syncUI();
    showFeedback(`Receita "${label}" removida.`);
  }

  function handleFlourDelete(flour) {
    if (!flour || !flour.id) return;
    const label = flour.name || "Farinha sem nome";
    const shouldRemove = window.confirm(
      `Apagar a farinha "${label}"?`
    );
    if (!shouldRemove) return;

    state.flours = state.flours.filter((item) => item.id !== flour.id);
    flourStorage.save(state.flours);
    updateFlourTypeFilterOptions();
    renderFlourList();
    updateAllBlendSelectOptions();
    updateBlendTotal();
    showFeedback(`Farinha "${label}" removida.`);
  }
 
  function toggleStyleCustomField(value) {
    if (!recipeStyleCustomGroup || !recipeStyleCustomInput) return;
    const shouldShow = value === "Outro";
    recipeStyleCustomGroup.classList.toggle("is-hidden", !shouldShow);
    recipeStyleCustomGroup.toggleAttribute("hidden", !shouldShow);
    recipeStyleCustomInput.required = shouldShow;
    if (!shouldShow) {
      recipeStyleCustomGroup.setAttribute("hidden", "hidden");
      recipeStyleCustomInput.value = "";
    } else {
      recipeStyleCustomGroup.removeAttribute("hidden");
    }
  }

  function handleRecipeStyleChange() {
    if (!recipeStyleSelect) return;
    toggleStyleCustomField(recipeStyleSelect.value);
  }

  function populateBlendSelectOptions(select, selectedValue = "") {
    if (!select) return;
    const fragment = document.createDocumentFragment();
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Selecione";
    fragment.appendChild(placeholder);

    const customOption = document.createElement("option");
    customOption.value = "custom";
    customOption.textContent = "Informar manualmente";
    fragment.appendChild(customOption);

    if (state.flours.length) {
      const optgroup = document.createElement("optgroup");
      optgroup.label = "Minhas farinhas";
      state.flours
        .slice()
        .sort((a, b) =>
          (a.name || "").localeCompare(b.name || "", "pt-BR", {
            sensitivity: "base",
          })
        )
        .forEach((flour) => {
          const option = document.createElement("option");
          option.value = flour.id;
          option.textContent = flour.name || "Farinha sem nome";
          optgroup.appendChild(option);
        });
      fragment.appendChild(optgroup);
    }

    select.innerHTML = "";
    select.appendChild(fragment);

    if (selectedValue) {
      select.value = selectedValue;
    }
  }

  function updateAllBlendSelectOptions() {
    if (!flourBlendList) return;
    const selects = flourBlendList.querySelectorAll(".flour-blend__select");
    selects.forEach((select) => {
      const previous = select.value;
      populateBlendSelectOptions(select, previous);
      const row = select.closest(".flour-blend__row");
      if (row) {
        handleBlendSelectChange(row);
      }
    });
  }

  function toggleBlendCustomField(row, shouldShow) {
    const customInput = row.querySelector(".flour-blend__custom");
    if (!customInput) return;
    customInput.classList.toggle("is-hidden", !shouldShow);
    customInput.toggleAttribute("hidden", !shouldShow);
    customInput.required = shouldShow;
    if (!shouldShow) {
      customInput.value = "";
      customInput.setAttribute("hidden", "hidden");
    } else {
      customInput.removeAttribute("hidden");
      customInput.focus();
    }
  }

  function updateBlendTotal() {
    if (!flourBlendList || !flourBlendTotal) return;
    const percentages = Array.from(
      flourBlendList.querySelectorAll(".flour-blend__percentage")
    )
      .map((input) => parseNumeric(input.value) || 0)
      .reduce((sum, value) => sum + value, 0);

    const rounded = Math.round(percentages * 10) / 10;
    flourBlendTotal.textContent = `Total: ${decimalFormatter.format(rounded)}%`;
    flourBlendTotal.classList.toggle(
      "is-invalid",
      Math.abs(rounded - 100) > 0.5 && rounded > 0
    );
  }

  function handleBlendSelectChange(row) {
    const select = row.querySelector(".flour-blend__select");
    if (!select) return;
    const value = select.value;
    const isCustom = value === "custom";
    toggleBlendCustomField(row, isCustom);
  }

  function addFlourBlendRow(initial = null) {
    if (!flourBlendRowTemplate || !flourBlendList) return;
    const clone = flourBlendRowTemplate.content.firstElementChild.cloneNode(true);
    state.flourBlendCounter += 1;
    clone.dataset.blendRowId = `blend-${state.flourBlendCounter}`;

    const select = clone.querySelector(".flour-blend__select");
    const customInput = clone.querySelector(".flour-blend__custom");
    const percentageInput = clone.querySelector(".flour-blend__percentage");
    const removeButton = clone.querySelector(".flour-blend__remove");

    populateBlendSelectOptions(select, initial?.selection ?? "");

    if (initial?.type === "custom") {
      select.value = "custom";
      if (customInput) {
        customInput.value = initial?.name ?? "";
        customInput.classList.remove("is-hidden");
        customInput.removeAttribute("hidden");
        customInput.required = true;
      }
    } else if (initial?.selection) {
      select.value = initial.selection;
    }

    if (percentageInput && initial?.percentage !== undefined) {
      percentageInput.value = initial.percentage;
    }

    if (select) {
      select.addEventListener("change", () => {
        handleBlendSelectChange(clone);
        updateBlendTotal();
      });
      handleBlendSelectChange(clone);
    }

    if (percentageInput) {
      percentageInput.addEventListener("input", updateBlendTotal);
    }

    if (removeButton) {
      removeButton.addEventListener("click", () => {
        clone.remove();
        if (!flourBlendList.children.length) {
          addFlourBlendRow();
        }
        updateBlendTotal();
      });
    }

    flourBlendList.appendChild(clone);
    updateBlendTotal();
  }

  function resetBlendRows(initialBlend = []) {
    if (!flourBlendList) return;
    flourBlendList.innerHTML = "";
    state.flourBlendCounter = 0;
    if (initialBlend.length) {
      initialBlend.forEach((item) => addFlourBlendRow(item));
    } else {
      addFlourBlendRow();
    }
  }

  function togglePrefermentSection(method) {
    if (!prefermentFields) return;
    const shouldShow = Boolean(method && method !== "Direta");
    prefermentFields.classList.toggle("is-hidden", !shouldShow);
    prefermentFields.toggleAttribute("hidden", !shouldShow);
    if (shouldShow) {
      prefermentFields.removeAttribute("hidden");
      if (
        prefermentTypeSelect &&
        !prefermentTypeSelect.value &&
        method &&
        method !== "Outros"
      ) {
        prefermentTypeSelect.value = method;
      }
    } else {
      prefermentFields.setAttribute("hidden", "hidden");
      if (prefermentTypeSelect) prefermentTypeSelect.value = "";
      if (prefermentInoculationInput) prefermentInoculationInput.value = "";
      if (prefermentHydrationInput) prefermentHydrationInput.value = "";
      if (prefermentMaturationInput) prefermentMaturationInput.value = "";
    }
  }

  function handleRecipeFermentationChange() {
    if (!recipeFermentationSelect) return;
    const method = recipeFermentationSelect.value;
    togglePrefermentSection(method);
    if (
      prefermentTypeSelect &&
      method &&
      method !== "Direta" &&
      method !== "Outros" &&
      prefermentTypeSelect.value !== method
    ) {
      prefermentTypeSelect.value = method;
    }
    markYeastSuggestionStale();
  }

  function toggleFieldVisibility(wrapper, input, shouldShow, required = false) {
    if (!wrapper) return;
    wrapper.classList.toggle("is-hidden", !shouldShow);
    wrapper.toggleAttribute("hidden", !shouldShow);
    if (shouldShow) {
      wrapper.removeAttribute("hidden");
    }
    if (input) {
      input.required = Boolean(shouldShow && required);
    }
  }

  function updateFermentationTemperatureFields() {
    if (!recipeFermentationTempSelect) return;
    const type = recipeFermentationTempSelect.value;
    const showAmbient = type === "TA" || type === "Mista";
    const showControlled = type === "TC" || type === "Mista";
    const showAmbientDuration = type === "Mista";
    const shouldShowGroup =
      showAmbient || showControlled || showAmbientDuration;

    if (fermentationTemperatureFields) {
      fermentationTemperatureFields.classList.toggle(
        "is-hidden",
        !shouldShowGroup
      );
      fermentationTemperatureFields.toggleAttribute(
        "hidden",
        !shouldShowGroup
      );
      if (shouldShowGroup) {
        fermentationTemperatureFields.removeAttribute("hidden");
      }
    }

    toggleFieldVisibility(
      fermentationTempAmbientField,
      recipeFermentationAmbientTempInput,
      showAmbient,
      true
    );
    toggleFieldVisibility(
      fermentationTempControlledField,
      recipeFermentationControlledTempInput,
      showControlled,
      true
    );
    toggleFieldVisibility(
      fermentationTimeAmbientField,
      recipeFermentationAmbientDurationInput,
      showAmbientDuration,
      true
    );

    if (!showAmbient && recipeFermentationAmbientTempInput) {
      recipeFermentationAmbientTempInput.value = "";
    }
    if (!showControlled && recipeFermentationControlledTempInput) {
      recipeFermentationControlledTempInput.value = "";
    }
    if (!showAmbientDuration && recipeFermentationAmbientDurationInput) {
      recipeFermentationAmbientDurationInput.value = "";
    }
  }

  function handleFermentationTemperatureChange() {
    updateFermentationTemperatureFields();
    markYeastSuggestionStale();
  }

  function handlePhotoChange(event) {
    const input = event.currentTarget;
    const file = input?.files?.[0];

    if (!file) {
      clearPhotoPreview();
      return;
    }

    if (!file.type.startsWith("image/")) {
      showFeedback("Selecione um arquivo de imagem válido.");
      clearPhotoPreview();
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      if (!dataUrl) {
        showFeedback("Não foi possível carregar a imagem selecionada.");
        clearPhotoPreview();
        return;
      }

      state.pendingPhoto = {
        dataUrl,
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      };
      updatePhotoPreview(state.pendingPhoto);
    };

    reader.onerror = () => {
      console.error("Erro ao ler a imagem selecionada.");
      showFeedback("Não foi possível carregar a imagem selecionada.");
      clearPhotoPreview();
    };

    reader.readAsDataURL(file);
  }

  function handlePhotoRemoval(event) {
    event.preventDefault();
    clearPhotoPreview();
    if (recipePhotoInput) {
      recipePhotoInput.focus();
    }
  }

  function handleNewRecipeReset() {
    const shouldSkip = state.skipResetEffects;
    clearPhotoPreview();
    window.requestAnimationFrame(() => {
      if (recipeStyleSelect) {
        handleRecipeStyleChange();
      }
      resetBlendRows();
      if (formulaDoughCountInput) {
        formulaDoughCountInput.value = "";
      }
      if (formulaDoughWeightInput) {
        formulaDoughWeightInput.value = "260";
      }
      if (formulaTotalFlourInput) {
        formulaTotalFlourInput.value = "";
        delete formulaTotalFlourInput.dataset.autoValue;
      }
      calculateAutoFlour();
      resetYeastSuggestion();
      if (recipeFermentationSelect) {
        togglePrefermentSection(recipeFermentationSelect.value);
      }
      updateFermentationTemperatureFields();
      if (!shouldSkip) {
        hideSuccessSummary();
      }
      state.skipResetEffects = false;
    });
  }

  function handleMoreDetailsClick(event) {
    event.preventDefault();
    switchTab("list");
    const listTabButton = tabButtons.find(
      (button) => button.dataset.tab === "list"
    );
    listTabButton?.focus();
  }

  function switchTab(tabId) {
    if (state.activeTab === tabId) return;
    state.activeTab = tabId;

    tabButtons.forEach((button) => {
      const isActive = button.dataset.tab === tabId;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.tabIndex = isActive ? 0 : -1;
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.dataset.panel === tabId;
      panel.classList.toggle("is-hidden", !isActive);
      panel.toggleAttribute("hidden", !isActive);
      if (isActive) {
        panel.removeAttribute("hidden");
      }
    });
  }

  function focusTabByOffset(offset) {
    const currentIndex = tabButtons.findIndex(
      (button) => button.dataset.tab === state.activeTab
    );
    const nextIndex =
      (currentIndex + offset + tabButtons.length) % tabButtons.length;
    const nextTabId = tabButtons[nextIndex].dataset.tab;
    switchTab(nextTabId);
    tabButtons[nextIndex].focus();
  }

  function handleTabClick(event) {
    const tabId = event.currentTarget.dataset.tab;
    switchTab(tabId);
  }

  function handleTabKeyDown(event) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTabByOffset(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTabByOffset(-1);
        break;
      case "Home":
        event.preventDefault();
        switchTab(tabButtons[0].dataset.tab);
        tabButtons[0].focus();
        break;
      case "End":
        event.preventDefault();
        const lastIndex = tabButtons.length - 1;
        switchTab(tabButtons[lastIndex].dataset.tab);
        tabButtons[lastIndex].focus();
        break;
      default:
        break;
    }
  }

  function initTabs() {
    tabButtons.forEach((button) => {
      const isDefault = button.dataset.tab === state.activeTab;
      button.classList.toggle("is-active", isDefault);
      button.setAttribute("aria-selected", String(isDefault));
      button.tabIndex = isDefault ? 0 : -1;
      button.addEventListener("click", handleTabClick);
      button.addEventListener("keydown", handleTabKeyDown);
    });

    tabPanels.forEach((panel) => {
      const isDefault = panel.dataset.panel === state.activeTab;
      panel.classList.toggle("is-hidden", !isDefault);
      panel.toggleAttribute("hidden", !isDefault);
      if (isDefault) {
        panel.removeAttribute("hidden");
      }
    });
  }

  function handleNewRecipeSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = (formData.get("recipeName") || "").toString().trim();
    if (!name) {
      showFeedback("Dê um nome para sua receita antes de salvar.");
      return;
    }

    const styleChoice = (formData.get("recipeStyle") || "").toString().trim();
    let style = "";
    if (styleChoice === "Outro") {
      style = (formData.get("recipeStyleCustom") || "").toString().trim();
      if (!style) {
        showFeedback("Descreva o estilo desejado.");
        return;
      }
    } else {
      style = styleChoice;
    }

    const fermentationTemperature = (
      formData.get("recipeFermentationTemperature") || ""
    )
      .toString()
      .trim();

    if (!fermentationTemperature) {
      showFeedback("Informe a temperatura da fermentação.");
      return;
    }

    const doughCount = parseNumeric(formData.get("formulaDoughCount"));
    if (doughCount === null || doughCount <= 0) {
      showFeedback("Informe quantas massas você precisa (valor maior que zero).");
      return;
    }

    const doughBallWeight = parseNumeric(formData.get("formulaDoughWeight"));
    if (doughBallWeight === null || doughBallWeight <= 0) {
      showFeedback("Informe o peso alvo de cada massa (valor maior que zero).");
      return;
    }

    const fermentationMethod = (
      formData.get("recipeFermentation") || ""
    )
      .toString()
      .trim();
    if (!fermentationMethod) {
      showFeedback("Selecione o método de fermentação.");
      return;
    }

    const fermentationTimeInput = (
      formData.get("recipeFermentationTime") || ""
    )
      .toString()
      .trim();
    const fermentationTime = parseNumeric(fermentationTimeInput);
    if (fermentationTime === null || fermentationTime <= 0) {
      showFeedback(
        "Informe o tempo total de fermentação (valor maior que zero)."
      );
      return;
    }

    const ambientTempInput = parseNumeric(
      formData.get("recipeFermentationTempAmbient")
    );
    const controlledTempInput = parseNumeric(
      formData.get("recipeFermentationTempControlled")
    );
    const ambientPhaseTimeInput = parseNumeric(
      formData.get("recipeFermentationTimeAmbient")
    );

    const temperatureDetails = {
      type: fermentationTemperature,
      ambient: null,
      controlled: null,
      ambientDuration: null,
      controlledDuration: null,
    };

    switch (fermentationTemperature) {
      case "TA": {
        if (ambientTempInput === null || !Number.isFinite(ambientTempInput)) {
          showFeedback("Informe a temperatura ambiente média (°C).");
          return;
        }
        temperatureDetails.ambient = ambientTempInput;
        temperatureDetails.ambientDuration = fermentationTime;
        temperatureDetails.controlledDuration = 0;
        break;
      }
      case "TC": {
        if (
          controlledTempInput === null ||
          !Number.isFinite(controlledTempInput)
        ) {
          showFeedback("Informe a temperatura da geladeira (°C).");
          return;
        }
        temperatureDetails.ambient = ambientTempInput;
        temperatureDetails.controlled = controlledTempInput;
        temperatureDetails.ambientDuration = 0;
        temperatureDetails.controlledDuration = fermentationTime;
        break;
      }
      case "Mista": {
        if (ambientTempInput === null || !Number.isFinite(ambientTempInput)) {
          showFeedback("Informe a temperatura ambiente média (°C).");
          return;
        }
        if (
          controlledTempInput === null ||
          !Number.isFinite(controlledTempInput)
        ) {
          showFeedback("Informe a temperatura da geladeira (°C).");
          return;
        }
        if (
          ambientPhaseTimeInput === null ||
          ambientPhaseTimeInput <= 0 ||
          ambientPhaseTimeInput >= fermentationTime
        ) {
          showFeedback(
            "Informe o tempo em temperatura ambiente (maior que 0 e menor que o tempo total)."
          );
          return;
        }
        const controlledPhaseDuration = Math.max(
          fermentationTime - ambientPhaseTimeInput,
          0
        );
        if (controlledPhaseDuration <= 0) {
          showFeedback(
            "O tempo em temperatura controlada precisa ser maior que zero."
          );
          return;
        }
        temperatureDetails.ambient = ambientTempInput;
        temperatureDetails.controlled = controlledTempInput;
        temperatureDetails.ambientDuration = ambientPhaseTimeInput;
        temperatureDetails.controlledDuration = controlledPhaseDuration;
        break;
      }
      default:
        break;
    }

    const blendRows = flourBlendList
      ? Array.from(flourBlendList.querySelectorAll(".flour-blend__row"))
      : [];
    if (!blendRows.length) {
      showFeedback("Adicione ao menos uma farinha ao blend.");
      return;
    }

    const blend = [];
    let blendPercentageTotal = 0;

    for (const row of blendRows) {
      const select = row.querySelector(".flour-blend__select");
      const customInput = row.querySelector(".flour-blend__custom");
      const percentageInput = row.querySelector(".flour-blend__percentage");
      const selection = (select?.value || "").toString().trim();
      const percentageRaw = parseNumeric(percentageInput?.value);

      if (!selection) {
        showFeedback("Selecione a farinha em cada linha do blend.");
        return;
      }

      if (percentageRaw === null || percentageRaw <= 0) {
        showFeedback("Informe o percentual de cada farinha utilizada.");
        return;
      }

      const normalizedPercentage = Math.round(percentageRaw * 10) / 10;
      blendPercentageTotal += normalizedPercentage;

      if (selection === "custom") {
        const customName = (customInput?.value || "").toString().trim();
        if (!customName) {
          showFeedback("Informe o nome da farinha personalizada no blend.");
          return;
        }
        blend.push({
          type: "custom",
          name: customName,
          percentage: normalizedPercentage,
        });
      } else {
        const flour = state.flours.find((item) => item.id === selection);
        if (!flour) {
          showFeedback(
            "Não encontramos uma das farinhas selecionadas. Atualize a página e tente novamente."
          );
          return;
        }
        blend.push({
          type: "reference",
          id: flour.id,
          name: flour.name || "Farinha sem nome",
          percentage: normalizedPercentage,
          reference: {
            type: flour.type,
            protein: parseNumeric(flour.protein),
            strength: parseNumeric(flour.strength),
            absorption: parseNumeric(flour.absorption),
          },
        });
      }
    }

    const blendRoundedTotal = Math.round(blendPercentageTotal * 10) / 10;
    if (Math.abs(blendRoundedTotal - 100) > 0.5) {
      showFeedback(
        "Os percentuais das farinhas precisam somar 100%. Ajuste o blend antes de continuar."
      );
      return;
    }

    const flourLabel =
      blend.length === 1
        ? blend[0].name
        : blend
            .map(
              (item) =>
                `${decimalFormatter.format(item.percentage)}% ${item.name}`
            )
            .join(" • ");
    const flourReference =
      blend.length === 1 && blend[0].type === "reference"
        ? { ...blend[0].reference, id: blend[0].id, name: blend[0].name }
        : null;

    const parsePositivePercentage = (value, max) => {
      const numeric = parseNumeric(value);
      if (numeric === null) return null;
      if (numeric < 0 || (typeof max === "number" && numeric > max)) {
        return { error: true };
      }
      return numeric;
    };

    const totalFlourInput = formData.get("formulaTotalFlour");
    let totalFlour = parseNumeric(totalFlourInput);

    const waterPct = parsePositivePercentage(
      formData.get("formulaWaterPct"),
      120
    );
    if (waterPct === null || typeof waterPct === "object") {
      showFeedback("Informe a hidratação da massa (0% a 120%).");
      return;
    }
    if (waterPct <= 0) {
      showFeedback("A hidratação deve ser maior que 0%.");
      return;
    }

    const saltPctRaw = parsePositivePercentage(
      formData.get("formulaSaltPct"),
      15
    );
    if (saltPctRaw === null) {
      showFeedback("Informe o percentual de sal.");
      return;
    }
    if (typeof saltPctRaw === "object") {
      showFeedback("O percentual de sal deve estar entre 0% e 15%.");
      return;
    }
    const saltPct = saltPctRaw;

    const yeastWeight = parseNumeric(formData.get("formulaYeastGrams"));
    if (yeastWeight === null || yeastWeight < 0) {
      showFeedback("Informe a quantidade de fermento em gramas (valor positivo).");
      return;
    }

    const fatPctRaw = parsePositivePercentage(formData.get("formulaFatPct"), 25);
    if (fatPctRaw && typeof fatPctRaw === "object") {
      showFeedback("O percentual de gordura deve estar entre 0% e 25%.");
      return;
    }
    const fatPct = fatPctRaw;

    const sugarPctRaw = parsePositivePercentage(
      formData.get("formulaSugarPct"),
      25
    );
    if (sugarPctRaw && typeof sugarPctRaw === "object") {
      showFeedback("O percentual de açúcares deve estar entre 0% e 25%.");
      return;
    }
    const sugarPct = sugarPctRaw;

    const autoFlour = computeTotalFlourFromTargets({
      doughCount,
      doughWeight: doughBallWeight,
      waterPct,
      saltPct,
      fatPct,
      sugarPct,
      yeastWeight,
    });
    if (autoFlour !== null) {
      totalFlour = autoFlour;
      if (formulaTotalFlourInput) {
        const roundedAuto = Math.round(autoFlour);
        formulaTotalFlourInput.value = String(roundedAuto);
        formulaTotalFlourInput.dataset.autoValue = String(roundedAuto);
      }
    }

    if (totalFlour === null || totalFlour <= 0) {
      showFeedback("Informe a quantidade total de farinha (em gramas).");
      return;
    }

    const prefermentEnabled = fermentationMethod !== "Direta";
    let prefermentInfo = null;
    let prefermentFlourRaw = 0;
    let prefermentWaterRaw = 0;
    if (prefermentEnabled) {
      const inoculationValue = parseNumeric(
        formData.get("prefermentInoculation")
      );
      const hydrationValue = parseNumeric(
        formData.get("prefermentHydration")
      );
      if (
        inoculationValue === null ||
        inoculationValue <= 0 ||
        inoculationValue >= 100
      ) {
        showFeedback(
          "Informe a inoculação do pré-fermento entre 0% e 100% (exclusivo)."
        );
        return;
      }
      if (hydrationValue === null || hydrationValue < 0 || hydrationValue > 200) {
        showFeedback("Informe a hidratação do pré-fermento entre 0% e 200%.");
        return;
      }

      prefermentFlourRaw = totalFlour * (inoculationValue / 100);
      if (prefermentFlourRaw >= totalFlour) {
        showFeedback(
          "A inoculação do pré-fermento deve representar menos que 100% da farinha total."
        );
        return;
      }

      prefermentWaterRaw = prefermentFlourRaw * (hydrationValue / 100);
      const totalWaterRaw = totalFlour * (waterPct / 100);
      if (prefermentWaterRaw > totalWaterRaw) {
        showFeedback(
          "A água do pré-fermento excede a água total da massa. Ajuste os valores."
        );
        return;
      }

      const prefermentType = (
        formData.get("prefermentType") || ""
      )
        .toString()
        .trim() || fermentationMethod;
      const maturationValue = parseNumeric(
        formData.get("prefermentMaturation")
      );

      prefermentInfo = {
        enabled: true,
        type: prefermentType,
        inoculation: inoculationValue,
        hydration: hydrationValue,
        maturation: maturationValue,
      };
    }

    const round = (value) => {
      if (!Number.isFinite(value)) return null;
      return Math.round(value * 10) / 10;
    };
    const roundOrNull = (value) =>
      value === null || value === undefined ? null : round(Number(value));

    const totalWaterRaw = totalFlour * (waterPct / 100);
    const saltWeightRaw =
      saltPct === null ? null : totalFlour * (saltPct / 100);
    const yeastWeightRaw = yeastWeight === null ? null : yeastWeight;
    const fatWeightRaw =
      fatPct === null ? null : totalFlour * (fatPct / 100);
    const sugarWeightRaw =
      sugarPct === null ? null : totalFlour * (sugarPct / 100);

    const mixFlourRaw = totalFlour - prefermentFlourRaw;
    const mixWaterRaw = totalWaterRaw - prefermentWaterRaw;
    if (mixFlourRaw < 0 || mixWaterRaw < 0) {
      showFeedback(
        "Verifique os valores do pré-fermento: sobrou farinha ou água negativa na massa final."
      );
      return;
    }

    const totalDoughRaw =
      totalFlour +
      totalWaterRaw +
      (saltWeightRaw ?? 0) +
      (yeastWeightRaw ?? 0) +
      (fatWeightRaw ?? 0) +
      (sugarWeightRaw ?? 0);

    const notes = (formData.get("recipeNotes") || "").toString().trim();
    const timestamp = new Date().toISOString();

    if (prefermentInfo) {
      prefermentInfo.flour = round(prefermentFlourRaw);
      prefermentInfo.water = round(prefermentWaterRaw);
      prefermentInfo.totalWeight = round(prefermentFlourRaw + prefermentWaterRaw);
      prefermentInfo.percentage =
        totalFlour > 0
          ? Math.round((prefermentFlourRaw / totalFlour) * 1000) / 10
          : null;
    }

    const flourBlendWithWeights = blend.map((item) => ({
      ...item,
      weight:
        item.percentage !== null && item.percentage !== undefined
          ? round(totalFlour * (item.percentage / 100))
          : null,
    }));

    const yeastPct =
      yeastWeightRaw === null || yeastWeightRaw === 0
        ? yeastWeightRaw === 0
          ? 0
          : null
        : (yeastWeightRaw / totalFlour) * 100;

    const desiredDoughWeight =
      Number.isFinite(doughCount) && doughBallWeight !== null
        ? doughCount * doughBallWeight
        : null;

    const formula = {
      totalFlour: round(totalFlour),
      percentages: {
        water: waterPct,
        salt: saltPct,
        yeast: yeastPct === null ? null : Math.round(yeastPct * 100) / 100,
        fat: fatPct,
        sugar: sugarPct,
      },
      totals: {
        water: round(totalWaterRaw),
        salt: roundOrNull(saltWeightRaw),
        yeast: roundOrNull(yeastWeightRaw),
        fat: roundOrNull(fatWeightRaw),
        sugar: roundOrNull(sugarWeightRaw),
        totalDoughWeight: round(totalDoughRaw),
        targetDoughWeight: roundOrNull(desiredDoughWeight),
        mixFlour: round(mixFlourRaw),
        mixWater: round(mixWaterRaw),
        prefermentFlour: prefermentInfo
          ? round(prefermentFlourRaw)
          : null,
        prefermentWater: prefermentInfo
          ? round(prefermentWaterRaw)
          : null,
        prefermentWeight: prefermentInfo
          ? round(prefermentFlourRaw + prefermentWaterRaw)
          : null,
      },
      blend: flourBlendWithWeights,
    };
    formula.meta = {
      doughCount: Number.isFinite(doughCount) ? Math.round(doughCount) : null,
      doughBallWeight: roundOrNull(doughBallWeight),
      targetDoughWeight: roundOrNull(desiredDoughWeight),
    };
    formula.targetDoughWeight = roundOrNull(desiredDoughWeight);

    const recipe = {
      id: crypto.randomUUID(),
      name,
      style,
      styleCategory: styleChoice,
      fermentationMethod,
      fermentationTime,
      fermentationTemperature,
      fermentation: {
        method: fermentationMethod,
        totalTime: fermentationTime,
        temperature: fermentationTemperature,
        preferment: prefermentInfo,
      },
      flour: flourLabel,
      flourReference: flourReference,
      flourBlend: flourBlendWithWeights,
      hydration: waterPct,
      formula,
      preferment: prefermentInfo,
      formulation: {
        doughCount: Number.isFinite(doughCount) ? Math.round(doughCount) : null,
        doughBallWeight: roundOrNull(doughBallWeight),
        targetDoughWeight: roundOrNull(desiredDoughWeight),
      },
      photo: state.pendingPhoto ? { ...state.pendingPhoto } : null,
      notes,
      createdAt: timestamp,
      updatedAt: timestamp,
      ratings: [],
    };

    state.recipes.push(recipe);
    safeStorage.save(state.recipes);
    syncUI();
    state.skipResetEffects = true;
    event.currentTarget.reset();
    showSuccessSummary(recipe);
    state.skipResetEffects = false;
  }

  function setRecipeEvaluationFeedback(message, variant = "info") {
    if (!recipeDetailEvaluationFeedback) return;
    recipeDetailEvaluationFeedback.textContent = message;
    recipeDetailEvaluationFeedback.classList.toggle(
      "is-error",
      variant === "error"
    );
  }

  function submitRecipeEvaluation(recipeId, ratingValue, notes) {
    if (!recipeId) {
      setRecipeEvaluationFeedback(
        "Selecione uma receita para registrar a avaliação.",
        "error"
      );
      return null;
    }

    const numericRating = parseNumeric(ratingValue);
    if (numericRating === null || numericRating < 0 || numericRating > 10) {
      setRecipeEvaluationFeedback(
        "Informe uma nota válida entre 0 e 10.",
        "error"
      );
      return null;
    }

    const recipe = state.recipes.find((item) => item.id === recipeId);
    if (!recipe) {
      setRecipeEvaluationFeedback(
        "Receita não encontrada. Atualize a página e tente novamente.",
        "error"
      );
      return null;
    }

    const sanitizedNotes = (notes || "").toString().trim();
    const normalizedRating = Math.round(numericRating * 2) / 2;

    recipe.ratings.push({
      score: normalizedRating,
      notes: sanitizedNotes,
      date: new Date().toISOString(),
    });

    safeStorage.save(state.recipes);
    return recipe;
  }

  function handleRecipeEvaluationSubmit(event) {
    event.preventDefault();
    if (!recipeDetailEvaluationForm) return;
    const recipeId = recipeDetailEvaluationForm.dataset.recipeId || "";
    const ratingValue = recipeDetailEvaluationRating?.value ?? "";
    const notesValue = recipeDetailEvaluationNotes?.value ?? "";

    const recipe = submitRecipeEvaluation(recipeId, ratingValue, notesValue);
    if (!recipe) return;

    recipeDetailEvaluationForm.reset();
    syncUI();
    setRecipeEvaluationFeedback(
      `Avaliação registrada para "${recipe.name}".`
    );
    if (recipeDetailEvaluationRating) {
      recipeDetailEvaluationRating.focus();
    }
  }

  function init() {
    initThemeListener();
    state.recipes = safeStorage.load();
    state.flours = flourStorage.load();
    initTabs();
    syncUI();
    updateFlourTypeFilterOptions();
    renderFlourList();
    updateAllBlendSelectOptions();
    resetBlendRows();

    newRecipeForm.addEventListener("submit", handleNewRecipeSubmit);
    newRecipeForm.addEventListener("reset", handleNewRecipeReset);
    if (recipePhotoInput) {
      recipePhotoInput.addEventListener("change", handlePhotoChange);
    }
    if (photoRemoveButton) {
      photoRemoveButton.addEventListener("click", handlePhotoRemoval);
    }
    if (successMoreDetails) {
      successMoreDetails.addEventListener("click", handleMoreDetailsClick);
    }
    if (recipeStyleSelect) {
      recipeStyleSelect.addEventListener("change", handleRecipeStyleChange);
      handleRecipeStyleChange();
    }
    if (recipeOpenFloursButton) {
      recipeOpenFloursButton.addEventListener("click", (event) => {
        event.preventDefault();
        switchTab("flours");
        const flourTabButton = tabButtons.find(
          (button) => button.dataset.tab === "flours"
        );
        flourTabButton?.focus();
      });
    }
    if (flourBlendAddButton) {
      flourBlendAddButton.addEventListener("click", () => addFlourBlendRow());
    }
    if (recipeFermentationSelect) {
      recipeFermentationSelect.addEventListener(
        "change",
        handleRecipeFermentationChange
      );
      handleRecipeFermentationChange();
    }
    if (recipeFermentationTempSelect) {
      recipeFermentationTempSelect.addEventListener(
        "change",
        handleFermentationTemperatureChange
      );
      updateFermentationTemperatureFields();
    } else {
      updateFermentationTemperatureFields();
    }
    if (recipeFermentationTimeInput) {
      recipeFermentationTimeInput.addEventListener(
        "input",
        markYeastSuggestionStale
      );
    }
    const autoFlourInputs = [
      formulaDoughCountInput,
      formulaDoughWeightInput,
      formulaWaterInput,
      formulaSaltInput,
      formulaYeastInput,
      formulaFatInput,
      formulaSugarInput,
    ];
    autoFlourInputs.forEach((input) => {
      if (input) {
        input.addEventListener("input", () => {
          calculateAutoFlour();
          if (input === formulaYeastInput) {
            resetYeastSuggestion();
          } else {
            markYeastSuggestionStale();
          }
        });
      }
    });
    calculateAutoFlour();
    if (formulaYeastAutoButton) {
      formulaYeastAutoButton.addEventListener("click", handleYeastAutoClick);
    }
    [
      recipeFermentationAmbientTempInput,
      recipeFermentationControlledTempInput,
      recipeFermentationAmbientDurationInput,
    ].forEach((input) => {
      if (input) {
        input.addEventListener("input", markYeastSuggestionStale);
      }
    });
    if (recipeDetailEvaluationForm) {
      recipeDetailEvaluationForm.addEventListener(
        "submit",
        handleRecipeEvaluationSubmit
      );
    }
    if (flourFiltersForm) {
      flourFiltersForm.addEventListener("change", handleFlourFiltersChange);
      flourFiltersForm.addEventListener("reset", handleFlourFiltersReset);
    }
    if (flourNewButton) {
      flourNewButton.addEventListener("click", () => openFlourForm());
    }
    if (flourForm) {
      flourForm.addEventListener("submit", handleFlourFormSubmit);
    }
    if (flourFormCancel) {
      flourFormCancel.addEventListener("click", (event) => {
        event.preventDefault();
        closeFlourForm();
      });
    }
    if (recipeDetailCloseButtons.length) {
      recipeDetailCloseButtons.forEach((button) => {
        button.addEventListener("click", () => closeRecipeDetail());
      });
    }
    if (recipeDetailDialog) {
      recipeDetailDialog.addEventListener("close", () => {
        activeRecipeDetail = null;
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
