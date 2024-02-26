export const ApplyFilters = (products, filters, priceIntervals) => {
    let filteredResults = [...products];
    if (filters.brand.length > 0) {
        filteredResults = filteredResults.filter((product) =>
          filters.brand.includes(product.brand)
        );
      }
  
      if (filters.classification.length > 0) {
        filteredResults = filteredResults.filter((product) =>
          filters.classification.includes(product.product_type)
        );
      }
  
      if (filters.color.length > 0) {
        filteredResults = filteredResults.filter((product) => {
          const productColors = product.product_colors.map((color) =>
          color.colour_name ? color.colour_name.toLowerCase() : ""
          );
          const matches = filters.color.some((selectedColor) =>
            productColors.some((productColor) =>
              productColor.includes(selectedColor.toLowerCase())
            )
          );
          return matches;
        });
      }
  
      if (filters.property.length > 0) {
        filteredResults = filteredResults.filter((product) => {
          const productProperties = Array.isArray(product.tag_list)
            ? product.tag_list.map((prop) => prop.toLowerCase())
            : [];
  
          return filters.property.some((selectedProp) =>
            productProperties.includes(selectedProp.toLowerCase())
          );
        });
      }
  
      if (filters.price.length > 0) {
        filteredResults = filteredResults.filter((product) => {
          const productPrice = parseFloat(product.price);
          let intervals = priceIntervals.find(
            (item) =>
              productPrice >= item.array[0] && productPrice <= item.array[1]
          );
  
          return intervals && filters.price.includes(intervals.name);
        });
      }
    return filteredResults;
}