const root = document.documentElement;
const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const navOverlay = document.querySelector("[data-nav-overlay]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const rtlToggle = document.querySelector("[data-rtl-toggle]");
const notificationToggle = document.querySelector("[data-notification-toggle]");
const notificationPanel = document.querySelector("[data-notification-panel]");
const notificationWrap = document.querySelector("[data-notification-wrap]");
const notificationCount = document.querySelector("[data-notification-count]");
const notificationItems = document.querySelectorAll("[data-notification-item]");
const workoutTabs = document.querySelectorAll("[data-workout-tab]");
const workoutPanels = document.querySelectorAll("[data-workout-panel]");
const scheduleDays = document.querySelectorAll("[data-schedule-day]");
const scheduleTitle = document.querySelector("[data-schedule-title]");
const scheduleWorkout = document.querySelector("[data-schedule-workout]");
const scheduleDuration = document.querySelector("[data-schedule-duration]");
const scheduleIntensity = document.querySelector("[data-schedule-intensity]");
const scheduleFocus = document.querySelector("[data-schedule-focus]");
const progressFills = document.querySelectorAll("[data-progress-fill]");
const dropdownToggles = document.querySelectorAll("[data-dropdown-toggle]");
const revealItems = document.querySelectorAll("[data-reveal]");
const scrollHeroTrigger = document.querySelector("[data-scroll-hero]");
const counterItems = document.querySelectorAll("[data-counter]");
const comparisonWidgets = document.querySelectorAll("[data-comparison]");
const programTabs = document.querySelectorAll("[data-program-filter]");
const programGrid = document.querySelector("[data-program-grid]");
const programCards = document.querySelectorAll("[data-program-card]");
const programDetail = document.querySelector("[data-program-detail]");
const programDetailCategory = document.querySelector("[data-program-detail-category]");
const programDetailTitle = document.querySelector("[data-program-detail-title]");
const programDetailCopy = document.querySelector("[data-program-detail-copy]");
const programDetailFeatures = document.querySelector("[data-program-detail-features]");
const programDetailDuration = document.querySelector("[data-program-detail-duration]");
const programDetailLink = document.querySelector("[data-program-detail-link]");
const billingButtons = document.querySelectorAll("[data-billing-toggle]");
const pricingAmounts = document.querySelectorAll("[data-price-amount]");
const pricingNotes = document.querySelectorAll("[data-price-note]");
const mealTabs = document.querySelectorAll("[data-meal-filter]");
const mealGrid = document.querySelector("[data-meal-grid]");
const mealCards = document.querySelectorAll("[data-meal-card]");
const mealSummaryCalories = document.querySelector("[data-meal-summary-calories]");
const mealSummaryProtein = document.querySelector("[data-meal-summary-protein]");
const mealSummaryCarbs = document.querySelector("[data-meal-summary-carbs]");
const mealSummaryFat = document.querySelector("[data-meal-summary-fat]");
const mealSummaryProteinBar = document.querySelector("[data-meal-summary-protein-bar]");
const mealSummaryCarbsBar = document.querySelector("[data-meal-summary-carbs-bar]");
const mealSummaryFatBar = document.querySelector("[data-meal-summary-fat-bar]");
const testimonialSlider = document.querySelector("[data-testimonial-slider]");
const testimonialViewport = document.querySelector(".reviews-slider__viewport");
const testimonialTrack = document.querySelector("[data-testimonial-track]");
const testimonialCards = document.querySelectorAll("[data-testimonial-card]");
const testimonialPrev = document.querySelector("[data-testimonial-prev]");
const testimonialNext = document.querySelector("[data-testimonial-next]");
const testimonialDots = document.querySelector("[data-testimonial-dots]");
const videoModal = document.querySelector("[data-video-modal]");
const videoFrame = document.querySelector("[data-video-frame]");
const videoTriggers = document.querySelectorAll("[data-video-trigger]");
const videoCloseButtons = document.querySelectorAll("[data-video-close]");
const mobileViewport = window.matchMedia("(max-width: 1024px)");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
let testimonialPage = 0;

const closeDropdowns = (keepOpen) => {
    dropdownToggles.forEach((toggle) => {
        const parent = toggle.closest("[data-dropdown]");
        const shouldStayOpen = keepOpen && parent === keepOpen;

        parent?.classList.toggle("is-open", Boolean(shouldStayOpen));
        toggle.setAttribute("aria-expanded", String(Boolean(shouldStayOpen)));
    });
};

const closeNavigation = () => {
    navPanel?.classList.remove("is-open");
    navOverlay?.classList.remove("is-visible");
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open menu");

    const icon = navToggle?.querySelector("i");
    if (icon) {
        icon.className = "fa-solid fa-bars-staggered";
    }

    if (mobileViewport.matches) {
        closeDropdowns(null);
    }
};

const updateNotificationCount = () => {
    if (!notificationCount) {
        return;
    }

    const unreadTotal = Array.from(notificationItems).filter((item) => item.classList.contains("is-unread")).length;
    notificationCount.textContent = `${unreadTotal}`;
    notificationCount.hidden = unreadTotal === 0;
};

const closeNotificationPanel = () => {
    notificationPanel?.classList.remove("is-open");
    notificationPanel?.setAttribute("aria-hidden", "true");
    notificationToggle?.setAttribute("aria-expanded", "false");
    notificationToggle?.setAttribute("aria-label", "Open notifications");
};

const updateThemeIcon = () => {
    const icon = themeToggle?.querySelector("i");
    if (!icon) {
        return;
    }

    if (body.classList.contains("dark-mode")) {
        icon.className = "fa-solid fa-moon";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    } else {
        icon.className = "fa-solid fa-sun";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    }
};

const updateScrollState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 10);
};

const setActiveHeaderLink = () => {
    const headerNav = document.querySelector(".nav-panel");
    if (!headerNav) {
        return;
    }

    const navLinks = headerNav.querySelectorAll("a[href]");
    const dropdownToggles = headerNav.querySelectorAll(".nav-dropdown-toggle");

    navLinks.forEach((link) => link.classList.remove("is-active"));
    dropdownToggles.forEach((toggle) => toggle.classList.remove("is-active"));

    const currentPath = decodeURIComponent(window.location.pathname || "");
    const currentFile = currentPath.split("/").pop()?.toLowerCase() || "";

    if (!currentFile) {
        return;
    }

    let activeLink = null;
    navLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        if (!href || href.startsWith("#") || href.startsWith("http")) {
            return;
        }

        const hrefFile = decodeURIComponent(href.split("/").pop() || "").toLowerCase();
        if (hrefFile === currentFile) {
            activeLink = link;
        }
    });

    if (!activeLink) {
        return;
    }

    activeLink.classList.add("is-active");
    const parentDropdown = activeLink.closest(".has-dropdown");
    parentDropdown?.querySelector(".nav-dropdown-toggle")?.classList.add("is-active");
};

const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);

const animateCounter = (counter) => {
    if (!(counter instanceof HTMLElement) || counter.dataset.animated === "true") {
        return;
    }

    const targetValue = Number.parseFloat(counter.dataset.target || "0");
    const decimalPlaces = Number.parseInt(counter.dataset.decimals || "0", 10);

    if (!Number.isFinite(targetValue)) {
        return;
    }

    if (reduceMotion.matches) {
        counter.textContent = decimalPlaces > 0 ? targetValue.toFixed(decimalPlaces) : Math.round(targetValue).toString();
        counter.dataset.animated = "true";
        return;
    }

    const duration = 1500;
    const startTime = performance.now();

    const renderValue = (value) => {
        counter.textContent = decimalPlaces > 0 ? value.toFixed(decimalPlaces) : Math.round(value).toString();
    };

    const tick = (timestamp) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const nextValue = targetValue * easeOutCubic(progress);

        renderValue(nextValue);

        if (progress < 1) {
            window.requestAnimationFrame(tick);
            return;
        }

        renderValue(targetValue);
        counter.dataset.animated = "true";
    };

    window.requestAnimationFrame(tick);
};

const syncComparison = (widget, value) => {
    if (!(widget instanceof HTMLElement)) {
        return;
    }

    const safeValue = Math.min(100, Math.max(0, value));
    const afterLayer = widget.querySelector("[data-comparison-after]");
    const handle = widget.querySelector("[data-comparison-handle]");
    const range = widget.querySelector("[data-comparison-range]");

    if (afterLayer instanceof HTMLElement) {
        afterLayer.style.width = `${safeValue}%`;
    }

    if (handle instanceof HTMLElement) {
        handle.style.left = `${safeValue}%`;
    }

    if (range instanceof HTMLInputElement) {
        range.value = `${safeValue}`;
    }
};

const setProgramDetail = (card) => {
    if (!(card instanceof HTMLElement)) {
        return;
    }

    const trigger = card.querySelector(".program-card__trigger");
    if (!(trigger instanceof HTMLElement)) {
        return;
    }

    programCards.forEach((item) => {
        const itemTrigger = item.querySelector(".program-card__trigger");
        const isActive = item === card;

        item.classList.toggle("is-active", isActive);
        itemTrigger?.setAttribute("aria-expanded", String(isActive));
    });

    if (programDetailCategory) {
        programDetailCategory.textContent = trigger.dataset.programCategory || "Program";
    }

    if (programDetailTitle) {
        programDetailTitle.textContent = trigger.dataset.programTitle || "Program Details";
    }

    if (programDetailCopy) {
        programDetailCopy.textContent = trigger.dataset.programCopy || "";
    }

    if (programDetailDuration) {
        programDetailDuration.textContent = trigger.dataset.programDuration || "";
    }

    if (programDetailLink instanceof HTMLAnchorElement) {
        programDetailLink.href = trigger.dataset.programLink || "Booking.html";
    }

    if (programDetailFeatures) {
        const features = (trigger.dataset.programFeatures || "")
            .split("|")
            .map((feature) => feature.trim())
            .filter(Boolean);

        programDetailFeatures.innerHTML = "";
        features.forEach((feature) => {
            const item = document.createElement("li");
            item.textContent = feature;
            programDetailFeatures.appendChild(item);
        });
    }

    programDetail?.classList.add("is-active");
};

const applyProgramFilter = (filterValue) => {
    if (!programCards.length) {
        return;
    }

    programGrid?.classList.add("is-filtering");

    const visibleCards = [];

    programCards.forEach((card) => {
        const cardCategory = card.dataset.category || "";
        const shouldShow = filterValue === "all" || cardCategory === filterValue;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCards.push(card);
        }
    });

    const activeCard = document.querySelector(".program-card.is-active");
    const nextActiveCard = activeCard instanceof HTMLElement && !activeCard.hidden
        ? activeCard
        : visibleCards[0];

    if (nextActiveCard) {
        setProgramDetail(nextActiveCard);
    }

    window.setTimeout(() => {
        programGrid?.classList.remove("is-filtering");
    }, 220);
};

const setBillingMode = (mode) => {
    const billingMode = mode === "yearly" ? "yearly" : "monthly";

    billingButtons.forEach((button) => {
        const isActive = button.dataset.billingToggle === billingMode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    pricingAmounts.forEach((amount) => {
        const nextValue = amount.dataset[billingMode];
        if (nextValue) {
            amount.textContent = nextValue;
        }
    });

    pricingNotes.forEach((note) => {
        const nextValue = note.dataset[`${billingMode}Note`];
        if (nextValue) {
            note.textContent = nextValue;
        }
    });
};

const setMealSummary = (tab) => {
    if (!(tab instanceof HTMLElement)) {
        return;
    }

    const calories = Number.parseInt(tab.dataset.summaryCalories || "0", 10);
    const protein = Number.parseInt(tab.dataset.summaryProtein || "0", 10);
    const carbs = Number.parseInt(tab.dataset.summaryCarbs || "0", 10);
    const fat = Number.parseInt(tab.dataset.summaryFat || "0", 10);

    if (mealSummaryCalories) {
        mealSummaryCalories.textContent = `${calories}`;
    }

    if (mealSummaryProtein) {
        mealSummaryProtein.textContent = `${protein}`;
    }

    if (mealSummaryCarbs) {
        mealSummaryCarbs.textContent = `${carbs}`;
    }

    if (mealSummaryFat) {
        mealSummaryFat.textContent = `${fat}`;
    }

    if (mealSummaryProteinBar instanceof HTMLElement) {
        mealSummaryProteinBar.style.width = `${Math.min(100, Math.round((protein / 250) * 100))}%`;
    }

    if (mealSummaryCarbsBar instanceof HTMLElement) {
        mealSummaryCarbsBar.style.width = `${Math.min(100, Math.round((carbs / 320) * 100))}%`;
    }

    if (mealSummaryFatBar instanceof HTMLElement) {
        mealSummaryFatBar.style.width = `${Math.min(100, Math.round((fat / 100) * 100))}%`;
    }
};

const applyMealFilter = (filterValue) => {
    if (!mealCards.length) {
        return;
    }

    mealGrid?.classList.add("is-filtering");

    mealCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(" ").filter(Boolean);
        const shouldShow = filterValue === "all" || categories.includes(filterValue);

        card.hidden = !shouldShow;
    });

    window.setTimeout(() => {
        mealGrid?.classList.remove("is-filtering");
    }, 220);
};

const getReviewCardsPerView = () => {
    if (window.innerWidth <= 639) {
        return 1;
    }

    if (window.innerWidth <= 1280) {
        return 2;
    }

    return 3;
};

const syncTestimonialSlider = () => {
    if (!(testimonialSlider instanceof HTMLElement) || !(testimonialTrack instanceof HTMLElement) || !testimonialCards.length) {
        return;
    }

    const cardsPerView = getReviewCardsPerView();
    const pageCount = Math.max(1, Math.ceil(testimonialCards.length / cardsPerView));
    const trackGap = Number.parseFloat(getComputedStyle(testimonialTrack).gap || "0");
    const cardWidth = testimonialCards[0]?.getBoundingClientRect().width || 0;
    const viewportWidth = testimonialViewport instanceof HTMLElement ? testimonialViewport.clientWidth : 0;
    const maxOffset = Math.max(0, testimonialTrack.scrollWidth - viewportWidth);

    testimonialPage = Math.min(testimonialPage, pageCount - 1);
    testimonialSlider.style.setProperty("--review-cards-per-view", `${cardsPerView}`);

    const baseOffset = testimonialPage * cardsPerView * (cardWidth + trackGap);
    const nextOffset = Math.min(baseOffset, maxOffset);
    testimonialTrack.style.transform = `translateX(${-nextOffset}px)`;

    if (testimonialDots instanceof HTMLElement) {
        testimonialDots.innerHTML = "";

        Array.from({ length: pageCount }).forEach((_, index) => {
            const dot = document.createElement("button");
            const isActive = index === testimonialPage;

            dot.type = "button";
            dot.className = `slider-dot${isActive ? " is-active" : ""}`;
            dot.setAttribute("aria-label", `Go to review page ${index + 1}`);
            dot.setAttribute("aria-pressed", String(isActive));
            dot.addEventListener("click", () => {
                testimonialPage = index;
                syncTestimonialSlider();
            });

            testimonialDots.appendChild(dot);
        });
    }

    if (testimonialPrev instanceof HTMLButtonElement) {
        testimonialPrev.disabled = testimonialPage === 0;
    }

    if (testimonialNext instanceof HTMLButtonElement) {
        testimonialNext.disabled = testimonialPage >= pageCount - 1;
    }
};

const openVideoModal = (source) => {
    if (!(videoModal instanceof HTMLElement) || !(videoFrame instanceof HTMLIFrameElement) || !source) {
        return;
    }

    videoFrame.src = source;
    videoModal.hidden = false;
    body.classList.add("video-modal-open");
};

const closeVideoModal = () => {
    if (!(videoModal instanceof HTMLElement) || !(videoFrame instanceof HTMLIFrameElement)) {
        return;
    }

    videoModal.hidden = true;
    videoFrame.src = "";
    body.classList.remove("video-modal-open");
};

const storedTheme = localStorage.getItem("pulseforge-theme");
if (storedTheme === "light") {
    body.classList.add("dark-mode");
} else {
    body.classList.remove("dark-mode");
}

const storedDirection = localStorage.getItem("pulseforge-direction");
if (storedDirection === "rtl" || storedDirection === "ltr") {
    root.setAttribute("dir", storedDirection);
}

updateThemeIcon();
updateScrollState();
updateNotificationCount();
setActiveHeaderLink();

themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("pulseforge-theme", body.classList.contains("dark-mode") ? "light" : "dark");
    updateThemeIcon();
});

rtlToggle?.addEventListener("click", () => {
    const nextDirection = root.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
    root.setAttribute("dir", nextDirection);
    localStorage.setItem("pulseforge-direction", nextDirection);
});

if (notificationToggle && notificationPanel) {
    notificationToggle.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = notificationPanel.classList.contains("is-open");
        notificationPanel.classList.toggle("is-open", !isOpen);
        notificationPanel.setAttribute("aria-hidden", String(isOpen));
        notificationToggle.setAttribute("aria-expanded", String(!isOpen));
        notificationToggle.setAttribute("aria-label", !isOpen ? "Close notifications" : "Open notifications");
    });

    notificationItems.forEach((item) => {
        const button = item.querySelector(".notification-item__button");

        button?.addEventListener("click", () => {
            if (item.classList.contains("is-unread")) {
                item.classList.remove("is-unread");
                updateNotificationCount();
            }
        });
    });

    document.addEventListener("click", (event) => {
        if (!(event.target instanceof Node)) {
            return;
        }

        if (notificationWrap && !notificationWrap.contains(event.target)) {
            closeNotificationPanel();
        }
    });
}

navToggle?.addEventListener("click", () => {
    const isOpen = !navPanel?.classList.contains("is-open");

    navPanel?.classList.toggle("is-open", isOpen);
    navOverlay?.classList.toggle("is-visible", isOpen);
    body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

    const icon = navToggle.querySelector("i");
    if (icon) {
        icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars-staggered";
    }
});

navOverlay?.addEventListener("click", closeNavigation);

dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        const parent = toggle.closest("[data-dropdown]");
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";

        if (mobileViewport.matches) {
            closeDropdowns(isExpanded ? null : parent);
            return;
        }

        closeDropdowns(isExpanded ? null : parent);
    });
});

document.addEventListener("click", (event) => {
    const clickedInsideNav = event.target instanceof Element && event.target.closest(".site-header");
    if (!clickedInsideNav) {
        closeDropdowns(null);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeDropdowns(null);
        closeNavigation();
        closeVideoModal();
        closeNotificationPanel();
    }
});

window.addEventListener("scroll", updateScrollState, { passive: true });

window.addEventListener("resize", () => {
    if (!mobileViewport.matches) {
        navPanel?.classList.remove("is-open");
        navOverlay?.classList.remove("is-visible");
        body.classList.remove("nav-open");
        navToggle?.setAttribute("aria-expanded", "false");

        const icon = navToggle?.querySelector("i");
        if (icon) {
            icon.className = "fa-solid fa-bars-staggered";
        }
    } else {
        closeDropdowns(null);
    }

    syncTestimonialSlider();
});

if (revealItems.length) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.18,
        }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
}

if (counterItems.length) {
    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.45,
        }
    );

    counterItems.forEach((counter) => counterObserver.observe(counter));
}

comparisonWidgets.forEach((widget) => {
    const range = widget.querySelector("[data-comparison-range]");

    if (!(range instanceof HTMLInputElement)) {
        return;
    }

    syncComparison(widget, Number.parseFloat(range.value || "50"));

    const handleInput = () => {
        syncComparison(widget, Number.parseFloat(range.value || "50"));
    };

    range.addEventListener("input", handleInput);
    range.addEventListener("change", handleInput);
});

if (programTabs.length && programCards.length) {
    programTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const filterValue = tab.dataset.programFilter || "all";

            programTabs.forEach((item) => {
                const isActive = item === tab;
                item.classList.toggle("is-active", isActive);
                item.setAttribute("aria-selected", String(isActive));
            });

            applyProgramFilter(filterValue);
        });
    });

    programCards.forEach((card) => {
        const trigger = card.querySelector(".program-card__trigger");

        trigger?.addEventListener("click", () => {
            setProgramDetail(card);
        });

        if (!finePointer.matches || reduceMotion.matches || !(trigger instanceof HTMLElement)) {
            return;
        }

        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            const offsetX = (event.clientX - rect.left) / rect.width;
            const offsetY = (event.clientY - rect.top) / rect.height;
            const rotateY = (offsetX - 0.5) * 10;
            const rotateX = (0.5 - offsetY) * 10;

            trigger.style.setProperty("--tilt-x", `${rotateX}deg`);
            trigger.style.setProperty("--tilt-y", `${rotateY}deg`);
        });

        card.addEventListener("pointerleave", () => {
            trigger.style.setProperty("--tilt-x", "0deg");
            trigger.style.setProperty("--tilt-y", "0deg");
        });
    });

    applyProgramFilter("all");
}

if (billingButtons.length && pricingAmounts.length) {
    billingButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setBillingMode(button.dataset.billingToggle || "monthly");
        });
    });

    setBillingMode("monthly");
}

if (mealTabs.length && mealCards.length) {
    mealTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const filterValue = tab.dataset.mealFilter || "weight-loss";

            mealTabs.forEach((item) => {
                const isActive = item === tab;
                item.classList.toggle("is-active", isActive);
                item.setAttribute("aria-selected", String(isActive));
            });

            setMealSummary(tab);
            applyMealFilter(filterValue);
        });
    });

    const defaultMealTab = document.querySelector(".meal-tab.is-active") || mealTabs[0];
    if (defaultMealTab instanceof HTMLElement) {
        setMealSummary(defaultMealTab);
        applyMealFilter(defaultMealTab.dataset.mealFilter || "weight-loss");
    }
}

if (testimonialCards.length && testimonialTrack instanceof HTMLElement) {
    testimonialPrev?.addEventListener("click", () => {
        testimonialPage = Math.max(0, testimonialPage - 1);
        syncTestimonialSlider();
    });

    testimonialNext?.addEventListener("click", () => {
        testimonialPage += 1;
        syncTestimonialSlider();
    });

    syncTestimonialSlider();
}

videoTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        openVideoModal(trigger.getAttribute("data-video-src") || "");
    });
});

videoCloseButtons.forEach((button) => {
    button.addEventListener("click", closeVideoModal);
});

scrollHeroTrigger?.addEventListener("click", () => {
    const heroSection = document.querySelector(".hero-section, .hero-alt-section");
    const nextSection = heroSection?.nextElementSibling instanceof HTMLElement
        ? heroSection.nextElementSibling
        : document.querySelector(".stats-section");

    if (nextSection) {
        window.scrollTo({
            top: nextSection.offsetTop - 60,
            behavior: "smooth",
        });
        return;
    }

    if (!heroSection) {
        return;
    }

    window.scrollTo({
        top: heroSection.offsetTop + heroSection.offsetHeight - 80,
        behavior: "smooth",
    });
});

const initWorkoutTabs = () => {
    if (!workoutTabs.length || !workoutPanels.length) {
        return;
    }

    const setActiveTab = (tab) => {
        const target = tab.dataset.workoutTab || "";

        workoutTabs.forEach((item) => {
            const isActive = item === tab;
            item.classList.toggle("is-active", isActive);
            item.setAttribute("aria-selected", String(isActive));
        });

        workoutPanels.forEach((panel) => {
            panel.classList.toggle("is-active", panel.dataset.workoutPanel === target);
        });
    };

    workoutTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            setActiveTab(tab);
        });
    });

    const defaultTab = document.querySelector(".workout-tab.is-active") || workoutTabs[0];
    if (defaultTab instanceof HTMLElement) {
        setActiveTab(defaultTab);
    }
};

const initScheduleDays = () => {
    if (!scheduleDays.length) {
        return;
    }

    const updateSchedule = (dayButton) => {
        scheduleDays.forEach((item) => item.classList.remove("is-active"));
        dayButton.classList.add("is-active");

        if (scheduleTitle) {
            scheduleTitle.textContent = `${dayButton.dataset.day}: ${dayButton.dataset.session || ""}`.trim();
        }

        if (scheduleWorkout) {
            scheduleWorkout.textContent = dayButton.dataset.session || "";
        }

        if (scheduleDuration) {
            scheduleDuration.textContent = dayButton.dataset.duration || "";
        }

        if (scheduleIntensity) {
            scheduleIntensity.textContent = dayButton.dataset.intensity || "";
        }

        if (scheduleFocus) {
            scheduleFocus.textContent = dayButton.dataset.focus || "";
        }
    };

    scheduleDays.forEach((day) => {
        day.addEventListener("click", () => {
            updateSchedule(day);
        });
    });

    const defaultDay = document.querySelector(".schedule-day.is-active") || scheduleDays[0];
    if (defaultDay instanceof HTMLElement) {
        updateSchedule(defaultDay);
    }
};

const animateProgressFills = () => {
    if (!progressFills.length) {
        return;
    }

    window.requestAnimationFrame(() => {
        progressFills.forEach((fill) => {
            const value = Number.parseInt(fill.dataset.progress || "0", 10);
            const safeValue = Math.min(100, Math.max(0, value));
            fill.style.width = `${safeValue}%`;
        });
    });
};

initWorkoutTabs();
initScheduleDays();
animateProgressFills();

const getCssVar = (name, fallback) => {
    const value = getComputedStyle(document.body).getPropertyValue(name).trim();
    return value || fallback;
};

const initDashboardCharts = () => {
    if (typeof Chart === "undefined") {
        return;
    }

    const workoutCanvas = document.getElementById("workoutProgressChart");
    const caloriesCanvas = document.getElementById("caloriesBurnedChart");
    const nutritionCanvas = document.getElementById("nutritionDonutChart");
    const strengthProgressCanvas = document.getElementById("strengthProgressChart");
    const nutritionMacroCanvas = document.getElementById("nutritionMacroChart");
    const weightProgressCanvas = document.getElementById("weightProgressChart");
    const strengthAnalyticsCanvas = document.getElementById("strengthAnalyticsChart");
    const performanceTrendsCanvas = document.getElementById("performanceTrendsChart");

    if (
        !(workoutCanvas instanceof HTMLCanvasElement) &&
        !(caloriesCanvas instanceof HTMLCanvasElement) &&
        !(nutritionCanvas instanceof HTMLCanvasElement) &&
        !(strengthProgressCanvas instanceof HTMLCanvasElement) &&
        !(nutritionMacroCanvas instanceof HTMLCanvasElement) &&
        !(weightProgressCanvas instanceof HTMLCanvasElement) &&
        !(strengthAnalyticsCanvas instanceof HTMLCanvasElement) &&
        !(performanceTrendsCanvas instanceof HTMLCanvasElement)
    ) {
        return;
    }

    const textMuted = getCssVar("--text-muted", "#9aa7bd");
    const textPrimary = getCssVar("--text-primary", "#f5f7fb");

    const tooltipStyle = {
        backgroundColor: "rgba(10,16,26,0.9)",
        borderColor: "rgba(255,255,255,0.12)",
        borderWidth: 1,
        titleColor: textPrimary,
        bodyColor: textPrimary,
    };

    if (workoutCanvas instanceof HTMLCanvasElement) {
        const lineCtx = workoutCanvas.getContext("2d");
        const lineGradient = lineCtx?.createLinearGradient(0, 0, 0, 220);
        if (lineGradient) {
            lineGradient.addColorStop(0, "rgba(141,255,47,0.35)");
            lineGradient.addColorStop(1, "rgba(141,255,47,0)");
        }

        new Chart(workoutCanvas, {
            type: "line",
            data: {
                labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
                datasets: [
                    {
                        label: "Workouts",
                        data: [3, 4, 5, 4, 6, 7, 6, 8],
                        borderColor: "#8dff2f",
                        backgroundColor: lineGradient || "rgba(141,255,47,0.2)",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.35,
                        pointRadius: 3,
                        pointBackgroundColor: "#8dff2f",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1200,
                    easing: "easeOutQuart",
                },
                plugins: {
                    legend: { display: false },
                    tooltip: tooltipStyle,
                },
                scales: {
                    x: {
                        grid: { color: "rgba(255,255,255,0.05)" },
                        ticks: { color: textMuted },
                    },
                    y: {
                        grid: { color: "rgba(255,255,255,0.05)" },
                        ticks: { color: textMuted },
                    },
                },
            },
        });
    }

    if (caloriesCanvas instanceof HTMLCanvasElement) {
        new Chart(caloriesCanvas, {
            type: "bar",
            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                    {
                        label: "Calories",
                        data: [520, 610, 580, 640, 720, 560, 600],
                        backgroundColor: [
                            "rgba(75,228,255,0.7)",
                            "rgba(75,228,255,0.55)",
                            "rgba(75,228,255,0.65)",
                            "rgba(75,228,255,0.75)",
                            "rgba(141,255,47,0.8)",
                            "rgba(75,228,255,0.5)",
                            "rgba(75,228,255,0.6)",
                        ],
                        borderRadius: 10,
                        borderSkipped: false,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1100,
                    easing: "easeOutQuart",
                },
                plugins: {
                    legend: { display: false },
                    tooltip: tooltipStyle,
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: textMuted },
                    },
                    y: {
                        grid: { color: "rgba(255,255,255,0.05)" },
                        ticks: { color: textMuted },
                    },
                },
            },
        });
    }

    if (nutritionCanvas instanceof HTMLCanvasElement) {
        new Chart(nutritionCanvas, {
            type: "doughnut",
            data: {
                labels: ["Protein", "Carbs", "Fat"],
                datasets: [
                    {
                        data: [38, 42, 20],
                        backgroundColor: ["#8dff2f", "#4be4ff", "#ab81ff"],
                        borderWidth: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "68%",
                animation: {
                    duration: 1200,
                    easing: "easeOutQuart",
                },
                plugins: {
                    legend: { display: false },
                    tooltip: tooltipStyle,
                },
            },
        });
    }

    if (strengthProgressCanvas instanceof HTMLCanvasElement) {
        const strengthCtx = strengthProgressCanvas.getContext("2d");
        const strengthGradient = strengthCtx?.createLinearGradient(0, 0, 0, 200);
        if (strengthGradient) {
            strengthGradient.addColorStop(0, "rgba(75,228,255,0.3)");
            strengthGradient.addColorStop(1, "rgba(75,228,255,0)");
        }

        new Chart(strengthProgressCanvas, {
            type: "line",
            data: {
                labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
                datasets: [
                    {
                        label: "Load (kg)",
                        data: [82, 85, 88, 90, 94, 98],
                        borderColor: "#4be4ff",
                        backgroundColor: strengthGradient || "rgba(75,228,255,0.2)",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.35,
                        pointRadius: 3,
                        pointBackgroundColor: "#4be4ff",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1200,
                    easing: "easeOutQuart",
                },
                plugins: {
                    legend: { display: false },
                    tooltip: tooltipStyle,
                },
                scales: {
                    x: {
                        grid: { color: "rgba(255,255,255,0.05)" },
                        ticks: { color: textMuted },
                    },
                    y: {
                        grid: { color: "rgba(255,255,255,0.05)" },
                        ticks: { color: textMuted },
                    },
                },
            },
        });
    }

    if (nutritionMacroCanvas instanceof HTMLCanvasElement) {
        new Chart(nutritionMacroCanvas, {
            type: "doughnut",
            data: {
                labels: ["Protein", "Carbs", "Fat"],
                datasets: [
                    {
                        data: [38, 42, 20],
                        backgroundColor: ["#8dff2f", "#4be4ff", "#ab81ff"],
                        borderWidth: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "68%",
                animation: {
                    duration: 1200,
                    easing: "easeOutQuart",
                },
                plugins: {
                    legend: { display: false },
                    tooltip: tooltipStyle,
                },
            },
        });
    }

    if (weightProgressCanvas instanceof HTMLCanvasElement) {
        const weightCtx = weightProgressCanvas.getContext("2d");
        const weightGradient = weightCtx?.createLinearGradient(0, 0, 0, 200);
        if (weightGradient) {
            weightGradient.addColorStop(0, "rgba(171,129,255,0.3)");
            weightGradient.addColorStop(1, "rgba(171,129,255,0)");
        }

        new Chart(weightProgressCanvas, {
            type: "line",
            data: {
                labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
                datasets: [
                    {
                        label: "Weight (kg)",
                        data: [82.4, 82.1, 81.7, 81.4, 81.0, 79.2],
                        borderColor: "#ab81ff",
                        backgroundColor: weightGradient || "rgba(171,129,255,0.2)",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.35,
                        pointRadius: 3,
                        pointBackgroundColor: "#ab81ff",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1200,
                    easing: "easeOutQuart",
                },
                plugins: {
                    legend: { display: false },
                    tooltip: tooltipStyle,
                },
                scales: {
                    x: {
                        grid: { color: "rgba(255,255,255,0.05)" },
                        ticks: { color: textMuted },
                    },
                    y: {
                        grid: { color: "rgba(255,255,255,0.05)" },
                        ticks: { color: textMuted },
                    },
                },
            },
        });
    }

    if (strengthAnalyticsCanvas instanceof HTMLCanvasElement) {
        new Chart(strengthAnalyticsCanvas, {
            type: "line",
            data: {
                labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
                datasets: [
                    {
                        label: "Bench",
                        data: [72, 74, 76, 78, 80, 82],
                        borderColor: "#8dff2f",
                        tension: 0.35,
                    },
                    {
                        label: "Squat",
                        data: [95, 98, 100, 104, 107, 110],
                        borderColor: "#4be4ff",
                        tension: 0.35,
                    },
                    {
                        label: "Deadlift",
                        data: [110, 112, 115, 118, 122, 126],
                        borderColor: "#ab81ff",
                        tension: 0.35,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1200,
                    easing: "easeOutQuart",
                },
                plugins: {
                    legend: {
                        labels: {
                            color: textMuted,
                        },
                    },
                    tooltip: tooltipStyle,
                },
                scales: {
                    x: {
                        grid: { color: "rgba(255,255,255,0.05)" },
                        ticks: { color: textMuted },
                    },
                    y: {
                        grid: { color: "rgba(255,255,255,0.05)" },
                        ticks: { color: textMuted },
                    },
                },
            },
        });
    }

    if (performanceTrendsCanvas instanceof HTMLCanvasElement) {
        new Chart(performanceTrendsCanvas, {
            type: "bar",
            data: {
                labels: ["Energy", "Recovery", "Sleep", "Stress"],
                datasets: [
                    {
                        label: "Score",
                        data: [82, 74, 88, 62],
                        backgroundColor: [
                            "rgba(141,255,47,0.7)",
                            "rgba(75,228,255,0.7)",
                            "rgba(171,129,255,0.7)",
                            "rgba(255,172,76,0.7)",
                        ],
                        borderRadius: 10,
                        borderSkipped: false,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1100,
                    easing: "easeOutQuart",
                },
                plugins: {
                    legend: { display: false },
                    tooltip: tooltipStyle,
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: textMuted },
                    },
                    y: {
                        grid: { color: "rgba(255,255,255,0.05)" },
                        ticks: { color: textMuted },
                    },
                },
            },
        });
    }
};

initDashboardCharts();
document.querySelector(".newsletter-form")?.addEventListener("submit", e=>{
e.preventDefault()

const input=e.target.querySelector("input")
if(!input.value) return

alert("Thanks for subscribing!")
input.value=""
})
const widgets = document.querySelectorAll(".about-widget")

window.addEventListener("mousemove", e => {

const x = (window.innerWidth / 2 - e.clientX) / 40
const y = (window.innerHeight / 2 - e.clientY) / 40

widgets.forEach(widget=>{
widget.style.transform = `translate(${x}px, ${y}px)`
})

})
const galleryItems = document.querySelectorAll("[data-lightbox]")

galleryItems.forEach(item=>{
item.addEventListener("click",e=>{
e.preventDefault()

const src = item.getAttribute("href")

const lightbox = document.createElement("div")
lightbox.className="gallery-lightbox"

lightbox.innerHTML=`
<div class="gallery-lightbox-inner">
<img src="${src}" alt="">
</div>
`

document.body.appendChild(lightbox)

lightbox.addEventListener("click",()=>{
lightbox.remove()
})

})
})

// SIDEBAR TOGGLE

const sidebarToggle = document.getElementById("sidebarToggle");
const dashboardSidebar = document.getElementById("dashboardSidebar");
const dashboardOverlay = document.querySelector("[data-dashboard-overlay]");

if (sidebarToggle && dashboardSidebar) {
  const closeSidebar = () => {
    dashboardSidebar.classList.remove("is-open");
    body.classList.remove("nav-open");
  };

  sidebarToggle.addEventListener("click", () => {
    const isOpen = dashboardSidebar.classList.toggle("is-open");
    body.classList.toggle("nav-open", isOpen);
  });

  dashboardOverlay?.addEventListener("click", closeSidebar);

  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Node)) {
      return;
    }

    if (!dashboardSidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      closeSidebar();
    }
  });
}


// MENU SWITCHING (IMPORTANT)

const menuLinks = document.querySelectorAll(".menu-link");
const panels = document.querySelectorAll(".dashboard-panel");

if (menuLinks.length && panels.length) {
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-target");
      const targetPanel = target ? document.getElementById(target) : null;

      if (!targetPanel) {
        return;
      }

      // ACTIVE MENU
      menuLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");

      // SHOW PANEL
      panels.forEach((panel) => {
        panel.classList.remove("active");
      });

      targetPanel.classList.add("active");

      // AUTO CLOSE MOBILE SIDEBAR
      if (window.innerWidth < 1025 && dashboardSidebar) {
        dashboardSidebar.classList.remove("is-open");
        body.classList.remove("nav-open");
      }
    });
  });
}

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  togglePassword.innerHTML =
    type === "password"
      ? '<i class="fa-regular fa-eye"></i>'
      : '<i class="fa-regular fa-eye-slash"></i>';
});


// FORM VALIDATION

const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  if (!email.value.trim() || !password.value.trim()) {
    alert("Please fill all fields");
    return;
  }

  alert("Login successful");
});

// PASSWORD TOGGLE

const regPassword = document.getElementById("password");
const regToggle = document.getElementById("togglePassword");

if(regToggle){
regToggle.addEventListener("click", () => {

  const isPassword = regPassword.type === "password";
  regPassword.type = isPassword ? "text" : "password";

  regToggle.innerHTML = isPassword
    ? '<i class="fa-regular fa-eye-slash"></i>'
    : '<i class="fa-regular fa-eye"></i>';

});
}


// PASSWORD STRENGTH (NO INLINE STYLES)

const strengthText = document.getElementById("passwordStrength");

if(regPassword){
regPassword.addEventListener("input", () => {

  const value = regPassword.value;

  if (value.length < 6) {
    strengthText.textContent = "Weak password";
    strengthText.className = "form-hint is-weak";
  } 
  else if (value.length < 10) {
    strengthText.textContent = "Medium strength";
    strengthText.className = "form-hint is-medium";
  } 
  else {
    strengthText.textContent = "Strong password";
    strengthText.className = "form-hint is-strong";
  }

});
}


// FORM VALIDATION (SAFE VERSION)

const registerForm = document.getElementById("registerForm");

if(registerForm){
registerForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const terms = document.getElementById("terms").checked;

  if (!password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (!terms) {
    alert("Please accept terms");
    return;
  }

  alert("Account created successfully");

});
}

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 10); // 10 days from now

function updateCountdown(){

  const now = new Date();
  const diff = targetDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

}

setInterval(updateCountdown,1000);
updateCountdown();
