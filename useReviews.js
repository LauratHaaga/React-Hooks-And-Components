function useReviews(productId) {
  const getReviewsScript = React.useCallback(() => {
    const docLocale = document.querySelector('meta[property="og:locale"]').getAttribute('content').replace('-', '_'); 
    if (docLocale === 'it_IT') {
        return 'https://cdn.mark.reevoo.com/assets/reevoo_mark.js';
    } 
  
    return `https://apps.bazaarvoice.com/deployments/samsung-${docLocale.toLowerCase()}/main_site/production/${docLocale}/bv.js`;
  });
  
  const getScript = React.useCallback((source) => {
    const script = document.createElement('script');
    const prior = document.getElementsByTagName('script')[0];
    script.async = 1;
  
    script.src = source;
    prior.parentNode.insertBefore(script, prior);
  });

  const formatModelCode = (sku) => {
    let formatedModelCode = '';
    if (sku !== undefined) formatedModelCode = sku.replace('/', '_');
    return formatedModelCode;
  };
  
  React.useLayoutEffect(() => {
    getScript(getReviewsScript());
  }, [getReviewsScript, getScript]);

  return (
    <a>
      <div data-bv-show="rating_summary" data-bv-productid={formatModelCode(productId)} />
    <a/>
  )
}
