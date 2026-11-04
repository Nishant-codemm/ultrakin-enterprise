/**
 * SolutionBreadcrumb.jsx
 * "Solutions / [Icon] Solution Name" breadcrumb matching original Ultrakin standard.
 * Features:
 * - Proper aria-current="page" semantics for active item
 * - Navigation to /solutions directory
 */
import React from 'react';
import ProductBreadcrumb from '../product/ProductBreadcrumb';

export default function SolutionBreadcrumb({ solutionName, solutionColor, icon: Icon }) {
  return (
    <ProductBreadcrumb
      parentLabel="Solutions"
      parentPath="/solutions"
      productName={solutionName}
      productColor={solutionColor}
      icon={Icon}
    />
  );
}
