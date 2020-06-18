// @flow
import React, { PureComponent } from "react";

import Icon from "components/icon";

import "./styles.scss";

type CategoryCardProps = {
  title: string,
  color: string,
  icon: string,
  onClickCard: Function,
};

class CategoryCard extends PureComponent<CategoryCardProps> {
  render() {
    const { title, color, icon, onClickCard } = this.props;

    return (
      <div onClick={onClickCard} className={`category ${color}`}>
        <div className={"category-content"}>
          <Icon icon={icon} />
          <div className="category-title ">{title}</div>
        </div>
      </div>
    );
  }
}

export default CategoryCard;
