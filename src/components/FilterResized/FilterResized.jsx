/* eslint-disable react/prop-types */
import styles from '../FilterResized/filter.module.css'
import { Checkbox } from '../../Pages/CreatePage/CreatePage';

export default function FilterResized({
    toggleActiveFilter, 
    activeFilter, 
    brands, 
    checkedBrand,
    handleCheckChange,
    classifications,
    checkedClassification,
    colors,
    checkedColor,
    prices,
    checkedPrice,
    properties,
    checkedProperty,
    toggleFilterResized
}){
    return (
        <div className={styles.moduleContainer}>
            <div className={styles.filtersContainer}>
                <div className={styles.filtersTitle}>Filters</div>
              <div
                className={styles.filterBox}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleActiveFilter("brand");
                }}
              >
                <button type="button">Brands</button>
                <span>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 6L9.5 13L1 6" stroke="black"></path>
                  </svg>
                </span>
                {activeFilter === "brand" && (
                  <ul
                    className={styles.filterOptions}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {brands.map((brand, index) => (
                      <li key={index}>
                        <Checkbox
                          label={brand}
                          checked={
                            checkedBrand.indexOf(brand) === -1 ? false : true
                          }
                          onChange={() =>
                            handleCheckChange(checkedBrand, brand, "brand")
                          }
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div
                className={styles.filterBox}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleActiveFilter("classification");
                }}
              >
                <button type="button">Classification</button>
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 6L9.5 13L1 6" stroke="black"></path>
                  </svg>
                </span>
                {activeFilter === "classification" && (
                  <ul
                    className={styles.filterOptions}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {classifications.map((classification, index) => (
                      <li key={index}>
                        <Checkbox
                          label={classification}
                          checked={
                            checkedClassification.indexOf(classification) === -1
                              ? false
                              : true
                          }
                          onChange={() =>
                            handleCheckChange(
                              checkedClassification,
                              classification,
                              "classification"
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div
                className={styles.filterBox}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleActiveFilter("color");
                }}
              >
                <button type="button">Color</button>
                <span>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 6L9.5 13L1 6" stroke="black"></path>
                  </svg>
                </span>
                {activeFilter === "color" && (
                  <ul
                    className={styles.filterOptions}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {colors.map((color, index) => (
                      <li key={index}>
                        <Checkbox
                          label={color}
                          checked={
                            checkedColor.indexOf(color) === -1 ? false : true
                          }
                          onChange={() =>
                            handleCheckChange(checkedColor, color, "color")
                          }
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div
                className={styles.filterBox}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleActiveFilter("price");
                }}
              >
                <button type="button">Price</button>
                <span>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 6L9.5 13L1 6" stroke="black"></path>
                  </svg>
                </span>
                {activeFilter === "price" && (
                  <ul
                    className={styles.filterOptions}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {prices.map((price, index) => (
                      <li key={index}>
                        <Checkbox
                          label={price}
                          checked={
                            checkedPrice.indexOf(price) === -1 ? false : true
                          }
                          onChange={() =>
                            handleCheckChange(checkedPrice, price, "price")
                          }
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div
                className={styles.filterBox}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleActiveFilter("property");
                }}
              >
                <button type="button">Property</button>
                <span>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 6L9.5 13L1 6" stroke="black"></path>
                  </svg>
                </span>
                {activeFilter === "property" && (
                  <ul
                    className={styles.filterOptions}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {properties.map((property, index) => (
                      <li key={index}>
                        <Checkbox
                          label={property}
                          checked={
                            checkedProperty.indexOf(property) === -1
                              ? false
                              : true
                          }
                          onChange={() =>
                            handleCheckChange(
                              checkedProperty,
                              property,
                              "property"
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button onClick={toggleFilterResized} className={styles.closeFilters}>CLOSE THE FILTERS</button>
        </div>  
        </div>
        
    )
}