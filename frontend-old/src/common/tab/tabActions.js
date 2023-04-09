
//action para as tabs
export function selectTab(tabId){
    console.log(tabId)
    return {
        type: "TAB_SELECTED",
        payload: tabId
    }
}

export function showTabs(...tabIds){
    const tabsToShow = {}
    /**pegando o array "tabIds" e colocando no "tabsToShow" 
     * e adicionando true a cada item do array
     * cada aba que receba true significara que ela esta visivel*/
    tabIds.forEach(e => tabsToShow[e]=true)
    return{
        type:"TAB_SHOWED",
        payload: tabsToShow
    }
}