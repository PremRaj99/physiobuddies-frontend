export function useNotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return {
    handleGoBack,
  };
}
