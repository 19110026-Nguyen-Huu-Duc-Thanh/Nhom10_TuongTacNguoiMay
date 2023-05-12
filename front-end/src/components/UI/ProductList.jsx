import React, { useState } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const Container = styled.section`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  padding: 0px 120px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: ${({ active }) => active ? "blue" : "transparent"};
  color: ${({ active }) => active ? "white" : "black"};
  border: none;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: ${({ disabled }) => disabled ? "default" : "pointer"};
  pointer-events: ${({ disabled }) => disabled ? "none" : "auto"};

  &:hover {
    background-color: ${({ active }) => active ? "blue" : "gray"};
    color: white;
  }
`;

const ProductList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(data.length / productsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PageButton
          key={i}
          active={i === currentPage}
          disabled={i === currentPage}
          onClick={() => handleClick(i)}
        >
          {i}
        </PageButton>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <Container>
        {currentProducts.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))}
      </Container>
      <PaginationContainer>
        {renderPageNumbers()}
      </PaginationContainer>
    </>
  );
};

export default ProductList;
