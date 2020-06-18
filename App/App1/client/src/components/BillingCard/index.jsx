
import React, { PureComponent } from "react";

import Button from "components/button";

import "./styles.scss";

type CategoryCardProps = {
  id: String,
  number: String,
  type: String,
  expiry: String,
  isDefaultCard: boolean,
  removeCard: Function,
  setDefaultCard: Function
};

class CategoryCard extends PureComponent<CategoryCardProps> {
  render() {
    const {
      id,
      number,
      type,
      expiry,
      isDefaultCard,
      removeCard,
      setDefaultCard
    } = this.props;

    return (
      <div className="billing-card">
        <div className="billing-card-header">
          <div className="billing-card-header-type">{type}</div>
          <div
            className={
              isDefaultCard
                ? "billing-card-header-remove default-card"
                : "billing-card-header-remove"
            }
            onClick={() => removeCard({ cardId: id })}
          >
            remove
          </div>
        </div>
        <div className="billing-card-number">{`**** **** **** ${number}`}</div>
        <div className="billing-card-expiry">{`Expiry Date: ${expiry}`}</div>
        <div className="billing-card-actions">
          <Button
            disabled={isDefaultCard}
            onClick={() => setDefaultCard({ cardId: id })}
            fullWidth
          >
            Set Default
          </Button>
        </div>
      </div>
    );
  }
}

export default CategoryCard;
