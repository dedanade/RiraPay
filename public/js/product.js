/* eslint-disable */
import { createProduct } from './create';
import { updateProduct } from './update';

export const createProductInput = e => {
  e.preventDefault();

  const productName = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value || 0;
  const stock = document.getElementById('productStock').value;
  const additionalInfo = document.getElementById('additionalInfo').value;
  const discount = document.getElementById('inputDiscount').value;
  const colours = document.getElementById('color-tags').value;
  const sizes = document.getElementById('size-tags').value;

  const promoQty = document.getElementById('promoQty').value || 0;
  const promoPrice = document.getElementById('promoPrice').value || 0;

  const promoQty2 = document.getElementById('promoQty2').value || 0;
  const promoPrice2 = document.getElementById('promoPrice2').value || 0;

  const promoQty3 = document.getElementById('promoQty3').value || 0;
  const promoPrice3 = document.getElementById('promoPrice3').value || 0;

  const promoQty4 = document.getElementById('promoQty4').value || 0;
  const promoPrice4 = document.getElementById('promoPrice4').value || 0;

  const promoPriceQty = `${promoQty} = ${promoPrice} Naira, ${promoQty2} = ${promoPrice2} Naira, ${promoQty3} = ${promoPrice3} Naira, ${promoQty4} = ${promoPrice4} Naira`;
  const codOptionCheckbox = document.getElementById('cod_Check_Option');
  if (codOptionCheckbox.checked) {
    var codOption = false;
  }
  if (price > 0 && promoPriceQty.split(',')[0] != '0 = 0 Naira') {
    alert(`You can't use one Price and Varient at the same time`);
  } else
    createProduct(
      productName,
      price,
      stock,
      additionalInfo,
      discount,
      codOption,
      colours,
      sizes,
      promoPriceQty
    );
};

export const editProductInput = e => {
  e.preventDefault();
  const productName = document.getElementById('editproductName').value;
  const editprice = document.getElementById('editproductPrice').value || 0;
  const stock = document.getElementById('editproductStock').value;
  const additionalInfo = document.getElementById('editadditionalInfo').value;
  const discount = document.getElementById('editinputDiscount').value;
  const colours = document.getElementById('edit-color-tags').value;
  const sizes = document.getElementById('edit-size-tags').value;

  const promoQty = document.getElementById('editPromoQty').value || 0;
  const promoPrice = document.getElementById('editPromoPrice').value || 0;

  const promoQty2 = document.getElementById('editPromoQty2').value || 0;
  const promoPrice2 = document.getElementById('editPromoPrice2').value || 0;

  const promoQty3 = document.getElementById('editPromoQty3').value || 0;
  const promoPrice3 = document.getElementById('editPromoPrice3').value || 0;

  const promoQty4 = document.getElementById('editPromoQty4').value || 0;
  const promoPrice4 = document.getElementById('editPromoPrice4').value || 0;

  const promoPriceQty = `${promoQty} = ${promoPrice} Naira, ${promoQty2} = ${promoPrice2} Naira, ${promoQty3} = ${promoPrice3} Naira, ${promoQty4} = ${promoPrice4} Naira`;

  const editCodOptionCheckbox = document.getElementById(
    'edit_cod_Check_Option'
  );
  if (editCodOptionCheckbox.checked) {
    var editCodOption = false;
  } else {
    var editCodOption = true;
  }
  console.log(editprice);
  if (editprice > 0 && promoPriceQty.split(',')[0] != '0 = 0 Naira') {
    alert(`You can't use one Price and Varient at the same time`);
  } else
    updateProduct(
      productName,
      editprice,
      stock,
      additionalInfo,
      discount,
      editCodOption,
      colours,
      sizes,
      promoPriceQty
    );
};
