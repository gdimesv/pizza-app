(() => {
  const storageKey = "pizzaApp.recipes";
  const flourStorageKey = "pizzaApp.flours";
  const newRecipeForm = document.querySelector("#new-recipe-form");
  const evaluationForm = document.querySelector("#evaluation-form");
  const recipeListContainer = document.querySelector("#recipe-list");
  const evaluationSelect = document.querySelector("#evaluation-recipe");
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
  };

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
      parts.push(`${decimalFormatter.format(flourShareValue)}% da farinha`);
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

    const formula = recipe.formula && typeof recipe.formula === "object"
      ? recipe.formula
      : {};
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

    if (successFlourBlendList) {
      successFlourBlendList.innerHTML = "";
      if (details.flourBlend && details.flourBlend.length) {
        details.flourBlend.forEach((item) => {
          const listItem = document.createElement("li");
          const percentageLabel =
            item.percentage === null || item.percentage === undefined
              ? ""
              : `${decimalFormatter.format(item.percentage)}%`;
          const weightLabel = formatWeight(item.weight);
          const infoParts = [];
          const proteinValue = parseNumeric(item.reference?.protein);
          const strengthValue = parseNumeric(item.reference?.strength);
          if (item.reference?.type) infoParts.push(item.reference.type);
          if (proteinValue !== null) {
            infoParts.push(`${decimalFormatter.format(proteinValue)}% prot`);
          }
          if (strengthValue !== null) {
            infoParts.push(`W ${Math.round(strengthValue)}`);
          }
          const metaLabel = infoParts.length ? ` (${infoParts.join(", ")})` : "";
          const segments = [];
          if (percentageLabel) segments.push(percentageLabel);
          segments.push(`${item.name || "Farinha"}${metaLabel}`);
          if (weightLabel) segments.push(weightLabel);
          listItem.textContent = segments.join(" — ");
          successFlourBlendList.appendChild(listItem);
        });
      } else {
        const listItem = document.createElement("li");
        listItem.textContent = "Blend não informado.";
        successFlourBlendList.appendChild(listItem);
      }
    }

    if (successFormulaList) {
      successFormulaList.innerHTML = "";
      const formula = details.formula || {};
      const totals = formula.totals || {};
      const percentages = formula.percentages || {};
      const items = [];

      const totalFlourWeight = parseNumeric(formula.totalFlour);
      if (totalFlourWeight !== null) {
        items.push(`Farinha total: ${formatWeight(totalFlourWeight)}`);
      }

      const waterWeight = parseNumeric(totals.water);
      if (waterWeight !== null) {
        const waterParts = [`Água: ${formatWeight(waterWeight)}`];
        const waterPct = formatPercentage(percentages.water);
        if (waterPct) {
          waterParts.push(`(${waterPct})`);
        }
        items.push(waterParts.join(" "));
      }

      const saltWeight = parseNumeric(totals.salt);
      if (saltWeight !== null) {
        const saltParts = [`Sal: ${formatWeight(saltWeight)}`];
        const saltPctLabel = formatPercentage(percentages.salt);
        if (saltPctLabel) {
          saltParts.push(`(${saltPctLabel})`);
        }
        items.push(saltParts.join(" "));
      }

      const yeastWeight = parseNumeric(totals.yeast);
      if (yeastWeight !== null) {
        const yeastParts = [`Fermento: ${formatWeight(yeastWeight)}`];
        const yeastPctLabel = formatPercentage(percentages.yeast);
        if (yeastPctLabel) {
          yeastParts.push(`(${yeastPctLabel})`);
        }
        items.push(yeastParts.join(" "));
      }

      const fatWeight = parseNumeric(totals.fat);
      if (fatWeight !== null) {
        const fatParts = [`Gordura: ${formatWeight(fatWeight)}`];
        const fatPctLabel = formatPercentage(percentages.fat);
        if (fatPctLabel) {
          fatParts.push(`(${fatPctLabel})`);
        }
        items.push(fatParts.join(" "));
      }

      const sugarWeight = parseNumeric(totals.sugar);
      if (sugarWeight !== null) {
        const sugarParts = [`Açúcares: ${formatWeight(sugarWeight)}`];
        const sugarPctLabel = formatPercentage(percentages.sugar);
        if (sugarPctLabel) {
          sugarParts.push(`(${sugarPctLabel})`);
        }
        items.push(sugarParts.join(" "));
      }

      const mixFlourWeight = parseNumeric(totals.mixFlour);
      const mixWaterWeight = parseNumeric(totals.mixWater);
      if (mixFlourWeight !== null || mixWaterWeight !== null) {
        const parts = [];
        if (mixFlourWeight !== null) parts.push(`farinha ${formatWeight(mixFlourWeight)}`);
        if (mixWaterWeight !== null) parts.push(`água ${formatWeight(mixWaterWeight)}`);
        if (parts.length) {
          items.push(`Massa final (antes dos demais ingredientes): ${parts.join(" + ")}`);
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
          prefermentParts.push(
            `${decimalFormatter.format(flourShare)}% da farinha total`
          );
        }
        if (details.preferment.maturation !== undefined && details.preferment.maturation !== null) {
          const maturationValue = parseNumeric(details.preferment.maturation);
          if (maturationValue !== null) {
            prefermentParts.push(`${decimalFormatter.format(maturationValue)}h maturação`);
          }
        }
        const flourWeight = formatWeight(details.preferment.flour);
        const waterWeightPreferment = formatWeight(details.preferment.water);
        const breakdown = [];
        if (flourWeight) breakdown.push(`farinha ${flourWeight}`);
        if (waterWeightPreferment) breakdown.push(`água ${waterWeightPreferment}`);
        const breakdownLabel = breakdown.length ? ` (${breakdown.join(" + ")})` : "";
        const prefermentLabel = prefermentParts.length ? ` (${prefermentParts.join(" • ")})` : "";
        items.push(
          `Pré-fermento: ${prefermentWeight || "—"}${breakdownLabel}${prefermentLabel}`
        );
      }

      const totalDough = parseNumeric(totals.totalDoughWeight ?? details.totalDoughWeight);
      if (totalDough !== null) {
        items.push(`Massa total estimada: ${formatWeight(totalDough)}`);
      }

      if (items.length) {
        items.forEach((text) => {
          const listItem = document.createElement("li");
          listItem.textContent = text;
          successFormulaList.appendChild(listItem);
        });
      } else {
        const listItem = document.createElement("li");
        listItem.textContent = "Parâmetros ainda não informados.";
        successFormulaList.appendChild(listItem);
      }
    }

    successPanel.classList.remove("is-hidden");
    successPanel.removeAttribute("hidden");
  }

  function renderRecipeList(recipes) {
    recipeListContainer.innerHTML = "";

    if (!recipes.length) {
      recipeListContainer.className = "recipes-empty";
      recipeListContainer.innerHTML =
        "<p>Nenhuma receita cadastrada ainda.</p>";
      return;
    }

    recipeListContainer.className = "recipe-grid";

    recipes
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .forEach((recipe) => {
        const article = recipeTemplate.content
          .firstElementChild.cloneNode(true);

        article.querySelector(".recipe-card__title").textContent =
          recipe.name || "Receita sem nome";
        const createdLabel = recipe.createdAt
          ? `Criada em ${formatDate(recipe.createdAt)}`
          : "Criação não informada";
        article.querySelector(".recipe-card__meta").textContent = createdLabel;

        const details = getRecipeDetails(recipe);
        const photoContainer = article.querySelector(".recipe-card__photo");
        const photoImage = photoContainer?.querySelector("img") ?? null;

        if (photoContainer) {
          if (details.photo && details.photo.dataUrl) {
            if (photoImage) {
              photoImage.src = details.photo.dataUrl;
              photoImage.alt = recipe.name
                ? `Pizza ${recipe.name}`
                : "Foto da pizza registrada";
            }
            photoContainer.classList.remove("is-hidden");
          } else {
            if (photoImage) {
              photoImage.src = "";
              photoImage.alt = "Foto da pizza registrada";
            }
            photoContainer.classList.add("is-hidden");
          }
        }

          const factsList = article.querySelector(".recipe-card__facts");
          if (factsList) {
            factsList.innerHTML = "";
            const facts = [
              ["Estilo", details.style],
              ["Farinha", details.flourLabel || details.flour],
              ["Fermentação", details.fermentation],
              ["Pré-fermento", details.prefermentLabel],
              ["Hidratação", formatPercentage(details.hydration)],
              ["Massa total", formatWeight(details.totalDoughWeight)],
              ["Tempo total", formatHours(details.fermentationTime)],
            ];

          facts
            .filter(([, value]) => Boolean(value))
            .forEach(([label, value]) => {
              const row = document.createElement("div");
              const term = document.createElement("dt");
              const desc = document.createElement("dd");
              term.textContent = label;
              desc.textContent = value;
              row.append(term, desc);
              factsList.appendChild(row);
            });

          if (!factsList.children.length) {
            const row = document.createElement("div");
            const term = document.createElement("dt");
            const desc = document.createElement("dd");
            term.textContent = "Detalhes";
            desc.textContent = "Nenhum detalhe registrado ainda.";
            row.append(term, desc);
            factsList.appendChild(row);
          }
        }

        const notesParagraph = article.querySelector(".recipe-card__notes");
        if (notesParagraph) {
          if (details.notes) {
            notesParagraph.textContent = details.notes;
            notesParagraph.classList.remove("is-hidden");
          } else {
            notesParagraph.textContent = "";
            notesParagraph.classList.add("is-hidden");
          }
        }

        const averageLabel = article.querySelector(".recipe-card__average");
        const average = computeAverageScore(recipe.ratings);
        averageLabel.textContent = average
          ? `Nota média: ${average} (${recipe.ratings.length} avaliação${
              recipe.ratings.length > 1 ? "es" : ""
            })`
          : "Ainda sem avaliações";

        const ratingsList = article.querySelector(".recipe-card__ratings");
        if (recipe.ratings.length) {
          recipe.ratings
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach((rating) => {
              const item = document.createElement("li");
              item.textContent = `${formatDate(rating.date)} — Nota ${
                rating.score
              }${rating.notes ? ` • ${rating.notes}` : ""}`;
              ratingsList.appendChild(item);
            });
        } else {
          const item = document.createElement("li");
          item.textContent = "Sem avaliações registradas.";
          ratingsList.appendChild(item);
        }

        recipeListContainer.appendChild(article);
      });
  }

  function renderEvaluationOptions(recipes) {
    const currentValue = evaluationSelect.value;
    evaluationSelect.innerHTML = '<option value="">Selecione</option>';

    recipes.forEach((recipe) => {
      const option = document.createElement("option");
      option.value = recipe.id;
      option.textContent = recipe.name;
      evaluationSelect.appendChild(option);
    });

    if (recipes.some((recipe) => recipe.id === currentValue)) {
      evaluationSelect.value = currentValue;
    }
  }

  function syncUI() {
    renderRecipeList(state.recipes);
    renderEvaluationOptions(state.recipes);
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
      editFallback.addEventListener("click", () => openFlourForm(flour));
      card.appendChild(editFallback);
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
      if (recipeFermentationSelect) {
        togglePrefermentSection(recipeFermentationSelect.value);
      }
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
    if (!styleChoice) {
      showFeedback("Selecione o estilo que deseja atingir.");
      return;
    }

    let style = styleChoice;
    if (styleChoice === "Outro") {
      style = (formData.get("recipeStyleCustom") || "").toString().trim();
      if (!style) {
        showFeedback("Descreva o estilo desejado.");
        return;
      }
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
    if (fermentationTime !== null && fermentationTime < 0) {
      showFeedback("O tempo total de fermentação deve ser positivo.");
      return;
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
    const totalFlour = parseNumeric(totalFlourInput);
    if (totalFlour === null || totalFlour <= 0) {
      showFeedback("Informe a quantidade total de farinha (em gramas).");
      return;
    }

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
      prefermentInfo.percentage = blend.length
        ? Math.round((prefermentFlourRaw / totalFlour) * 1000) / 10
        : null;
    }

    const flourBlendWithWeights = blend.map((item) => ({
      ...item,
      weight: round(totalFlour * (item.percentage / 100)),
    }));

    const yeastPct =
      yeastWeightRaw === null || yeastWeightRaw === 0
        ? yeastWeightRaw === 0
          ? 0
          : null
        : (yeastWeightRaw / totalFlour) * 100;

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

    const recipe = {
      id: crypto.randomUUID(),
      name,
      style,
      styleCategory: styleChoice,
      fermentationMethod,
      fermentationTime,
      fermentation: {
        method: fermentationMethod,
        totalTime: fermentationTime,
        preferment: prefermentInfo,
      },
      flour: flourLabel,
      flourReference: flourReference,
      flourBlend: flourBlendWithWeights,
      hydration: waterPct,
      formula,
      preferment: prefermentInfo,
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

  function handleEvaluationSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const recipeId = formData.get("evaluationRecipe");
    const ratingValue = Number(formData.get("evaluationRating"));
    const notes = formData.get("evaluationNotes").trim();

    if (!recipeId) {
      showFeedback("Escolha uma receita para registrar a avaliação.");
      return;
    }

    if (Number.isNaN(ratingValue) || ratingValue < 0 || ratingValue > 10) {
      showFeedback("Informe uma nota válida entre 0 e 10.");
      return;
    }

    const recipe = state.recipes.find((item) => item.id === recipeId);
    if (!recipe) {
      showFeedback("Receita não encontrada. Atualize a página e tente novamente.");
      return;
    }

    recipe.ratings.push({
      score: ratingValue,
      notes,
      date: new Date().toISOString(),
    });

    safeStorage.save(state.recipes);
    syncUI();
    event.currentTarget.reset();
    showFeedback(`Avaliação registrada para "${recipe.name}".`);
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
    evaluationForm.addEventListener("submit", handleEvaluationSubmit);
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
  }

  document.addEventListener("DOMContentLoaded", init);
})();
