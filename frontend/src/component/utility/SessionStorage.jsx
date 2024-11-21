export const loadState = () => {
    try {
      const serializedState = sessionStorage.getItem('userState');
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
      console.error('Error loading state from sessionStorage:', err);
      return undefined;
    }
  };
  
  export const loadCartState = () => {
    try {
      const serializedState = sessionStorage.getItem('cartState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };

  export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('userState', serializedState);
  } catch (err) {
    console.error('Error saving state to sessionStorage:', err);
  }
};

  export const saveCartState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem('cartState', serializedState);
    } catch (err) {
        console.error('Error saving cart state to sessionStorage:', err);
    }
  };
  
  export const clearState = () => {
    try {
      sessionStorage.removeItem('state');
    } catch (err) {
      // Ignore write errors.
    }
  };
  