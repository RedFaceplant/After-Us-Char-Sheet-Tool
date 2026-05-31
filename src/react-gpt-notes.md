Here’s a clean “reference sheet” of what you’ve built and the mental model you should keep while continuing your Redux migration for the TTRPG character builder.

---

# 🧠 Redux Mental Model (for your app)

Redux is just:

```text
ONE global store
   ↓
slices split responsibility
   ↓
components read state with selectors
   ↓
components update state with actions
```

You still have **one store**, not multiple.

---

# 🏗️ Recommended Project Structure

For your character builder:

```text
src/
  app/
    store.ts
    hooks.ts

  features/
    abilities/
      abilitiesSlice.ts
      selectors.ts

    settings/
      settingsSlice.ts
      selectors.ts

    character/
      characterSlice.ts
      selectors.ts
```

Rule:
👉 “Feature owns its state, reducers, and selectors.”

---

# 🏪 Store Setup (ONE store)

```ts
export const store = configureStore({
  reducer: {
    abilities: abilitiesReducer,
    settings: settingsReducer,
    character: characterReducer,
  },
});
```

Everything lives inside this one store.

---

# 🧩 Slices (State + Reducers)

Example pattern:

```ts
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings(state, action: PayloadAction<Partial<Settings>>) {
      Object.assign(state, action.payload);
    },
  },
});
```

### Key idea:

You are allowed to "mutate" state:

```ts
state.darkMode = true;
state.abilities.push(x);
```

Redux Toolkit handles immutability for you.

---

# ➕ Common Array Reducers (Abilities example)

### Add

```ts
state.abilities.push(action.payload);
```

---

### Remove (by id)

```ts
state.abilities = state.abilities.filter(
  a => a.id !== action.payload
);
```

---

### Clear

```ts
state.abilities = [];
```

---

### Update

```ts
const index = state.abilities.findIndex(
  a => a.id === action.payload.id
);

if (index !== -1) {
  state.abilities[index] = action.payload;
}
```

---

# 🔁 Derived State (IMPORTANT)

Do NOT store derived values like:

* spells
* affinities
* modifiers
* calculated stats

Instead:

👉 store only raw data:

```ts
abilities
```

---

# 🧠 Selectors (WHERE MAGIC HAPPENS)

Selectors = “read logic from store”

```ts
export const selectAbilities = (state: RootState) =>
  state.abilities.currentAbilities;
```

---

## Derived selector example (spells)

```ts
export const selectSpells = createSelector(
  [selectAbilities],
  (abilities) => {
    const spells = abilities.flatMap(
      a => a.spells ?? []
    );

    return spells.length
      ? spells
      : ["no known spells"];
  }
);
```

---

## Why selectors matter

Instead of syncing state manually:

```ts
useEffect(() => { ...setSpells(...) }, [abilities])
```

Redux does:

```ts
abilities → selector → derived result
```

No duplication. No sync bugs.

---

# 🎣 React Usage

## Read state

```ts
const abilities = useSelector(
  (state: RootState) =>
    state.abilities.currentAbilities
);
```

or typed version:

```ts
const abilities = useAppSelector(selectAbilities);
```

---

## Dispatch updates

```ts
const dispatch = useDispatch();

dispatch(addAbility(newAbility));
dispatch(removeAbility(id));
dispatch(setSettings({ darkMode: true }));
```

---

# ⚙️ Typed Hooks (recommended)

```ts
export const useAppDispatch = () =>
  useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;
```

---

# ❌ What NOT to do

### Don’t do this:

```ts
useDispatch(setSettings(...)) // WRONG
```

### Don’t store derived state:

```ts
spells in state ❌
affinities in state ❌
```

### Don’t prop-drill Redux state:

That defeats the purpose.

---

# 🌟 Big Architectural Takeaways

## 1. Redux replaces prop drilling

Components stop passing state down manually.

---

## 2. Redux does NOT replace useState everywhere

Use Redux for:

* shared state
* character data
* settings
* abilities

Keep useState for:

* local UI state (modals, inputs, hover states)

---

## 3. Slices are NOT stores

They are just “sections” of one store.

---

## 4. Selectors replace useEffect syncing

Anything derived should be computed, not stored.

---

# 🎯 Your current progress (what you’ve already done right)

You’ve already hit the key milestones:

✔ created slices
✔ implemented reducers
✔ started dispatching actions
✔ moved away from prop drilling
✔ started thinking in global state

That’s basically the core Redux learning curve.

---

# If you want next step guidance

The natural next upgrades for your app would be:

* splitting `characterSlice` into domains (stats, leveling, equipment)
* replacing all derived `useEffect` logic with selectors
* adding Redux DevTools debugging workflow
* optionally adding persistence (localStorage)
