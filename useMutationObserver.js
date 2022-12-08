import { h } from 'preact';
import { 
    useRef, useEffect,
} from 'preact/hooks';

function useMutationObserver({ 
    pageType = '',
    observerOptions = { childList: true }, 
    ref = false,
    // callbackFunc = null,
}) {
    const timesIntervalID = useRef();
    // const wrapperElem = useRef();
    const cardElem = useRef();

    const pagesToObserve = {
        pfp: {
            wrapper: '.pd03-product-finder__content-wrap.js-pfv2-content-wrap',
            mainParent: '.pd03-product-finder__content-item.pd03-product-finder__content-item-view.js-pfv2-product-card',
        },
        buy: {
            wrapper: '.pd-g-header-navigation.aem-GridColumn.aem-GridColumn--default--12',
            mainParent: '',
        },
        pdp: '',
        cart: '',
        plp: '',
    };

    const reSelectDOMEl = (...elements) => elements.reduce((prevElems, currElement) => {
        const ElementClass = ` ${currElement.getAttribute('class')}`.replaceAll(' ', '.');
        const elem = cardElem.current.querySelector(ElementClass);
        return [...prevElems, elem];
    }, []);

    function getElementsFromParent(mainComponent) {
        const container = mainComponent.current?.parentElement ?? '';
        const prevSibling = container?.previousElementSibling ?? '';
        const nextSibling = container?.nextElementSibling ?? '';

        const elements = reSelectDOMEl(prevSibling, nextSibling, container);
        // eslint-disable-next-line no-console
        console.log(elements);
        return [prevSibling, nextSibling, container];
    }

    function getPositionAndAttachParent(prevPos, nextPos, placeHolder, containerRef) {
        // const clonedContainerRef = containerRef.cloneNode(true);

        if (!prevPos && !nextPos) return;

        if (prevPos && nextPos) placeHolder.insertBefore(containerRef, nextPos);
        
        if (prevPos && !nextPos) placeHolder.append(containerRef);

        if (!prevPos && nextPos) placeHolder.prepend(containerRef);
    }

    function observerFunc() {
        return (entrys) => {
            if (entrys) {
                // eslint-disable-next-line no-console
                console.log(entrys);
                getPositionAndAttachParent(
                    ...getElementsFromParent(ref),
                    ref.current,
                );
            }
        };
    }
    
    useEffect(() => {
        timesIntervalID.current = setInterval(() => {
            if (ref.current) {
                const { mainParent } = pagesToObserve[pageType];
                const obs = new MutationObserver(observerFunc());

                // wrapperElem.current = ref.current.closest(wrapper);
                cardElem.current = ref.current.closest(mainParent);

                // obs.observe(wrapperElem.current, observerOptions);
                obs.observe(cardElem.current, observerOptions);

                clearInterval(timesIntervalID.current);
            }
        }, 500);

        return () => {
            clearInterval(timesIntervalID.current);
        };
    }, [ref]);

    // return component;
}

export default useMutationObserver;
