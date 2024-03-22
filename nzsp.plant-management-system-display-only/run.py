import os
import logging
import log_module

from flask import Flask, jsonify
from flask_cors import CORS
from valid_check import po_length_check, sku_length_check, po_pdf_is_exists, check_shopping_sku_pdf_is_exists, check_packing_sku_pdf_is_exists
from data import get_production_data

# API part, according to the file path gets above handling PDF content
app = Flask(__name__)
CORS(app, resources={r"/*":{"origins": "http://localhost:3000"}})
def get_po_pdf_path(po, po_folder_path):
    # according to the po no. build the file name
    po_file_name = f"{po}.pdf"
    
    if po_pdf_is_exists(po_folder_path, po_file_name): # file exist
        po_pdf_path =  os.path.join(po_folder_path, po_file_name)
    else:
        po_pdf_path = None # here should consider which action may return some error let python catch?
    logging.info(f"po_pdf_path {po_pdf_path}") 
    return po_pdf_path, po_file_name

def get_sku_pdfs_path(sku, shopping_sku_path, packing_sku_path, shopping_sku_flag, packing_sku_flag):

    currect_shopping_po_file_name, shopping_sku_flag  = check_shopping_sku_pdf_is_exists(shopping_sku_path, sku, shopping_sku_flag)    
    logging.info(f"currect_shopping_po_file_name {currect_shopping_po_file_name}\nshopping_sku_flag {shopping_sku_flag}") 

    if shopping_sku_flag:
        logging.error(f' Shopping sku file does not exist. sku_id: {sku}. failed')
        return None, None
        # here consider which action returns an error or some other actions
    
    shopping_sku_pdf_path = os.path.join(shopping_sku_path, currect_shopping_po_file_name)

    currect_packing_po_file_name, packing_sku_flag  = check_packing_sku_pdf_is_exists(packing_sku_path, sku, packing_sku_flag)    
    logging.info(f"currect_packing_po_file_name {currect_packing_po_file_name}\npacking_sku_flag {packing_sku_flag}") 
    if packing_sku_flag:
        logging.error(f' Packing sku file does not exist. sku_id: {sku}. failed')
        # here consider which action returns an error or some other actions
        return None, None
    
    packing_sku_pdf_path = os.path.join(packing_sku_path, currect_packing_po_file_name)

    return shopping_sku_pdf_path, currect_shopping_po_file_name, packing_sku_pdf_path, currect_packing_po_file_name

def create_filepath_dict(po_pdf_file_path, po_name, shopping_sku_file_path, currect_shopping_po_file_name, packing_sku_file_path, currect_packing_po_file_name):
    file_path_dict = {}
    file_path_dict['po'] = po_pdf_file_path
    file_path_dict['po_name'] = po_name
    file_path_dict['shopping_sku'] = shopping_sku_file_path
    file_path_dict['shopping_sku_name'] = currect_shopping_po_file_name
    file_path_dict['packing_sku'] = packing_sku_file_path
    file_path_dict['packing_sku_name'] = currect_packing_po_file_name
    return file_path_dict


def build_filepath(po, sku):
    shopping_sku_flag = True
    packing_sku_flag = True

    po_folder_path = '../Operations/Restricted/Production Spec Sheet/BOM'
    shopping_sku_path = '../Operations/Restricted/Production Spec Sheet/Transit Hall Shopping layout'
    packing_sku_path = '../Operations/Restricted/Production Spec Sheet'

    po_pdf_file_path, po_name = get_po_pdf_path(po, po_folder_path)
    shopping_sku_file_path, currect_shopping_po_file_name, packing_sku_file_path, currect_packing_po_file_name = \
        get_sku_pdfs_path(sku, shopping_sku_path, packing_sku_path, shopping_sku_flag, packing_sku_flag)

    logging.info(f"po_pdf_file_path {po_pdf_file_path}\nshopping_sku_file_path {shopping_sku_file_path}\npacking_sku_file_path {packing_sku_file_path}")
    
    if po_pdf_file_path and shopping_sku_file_path and packing_sku_file_path:
        file_path_dict = create_filepath_dict(po_pdf_file_path, po_name, shopping_sku_file_path, currect_shopping_po_file_name, \
                                              packing_sku_file_path, currect_packing_po_file_name)
        return jsonify(file_path_dict)
    else:
        return jsonify({'error': 'PDF file not found'}), 404
    
@app.route('/', methods=['GET'])
def get_homepage():
    return 'Homepage'

@app.route('/get_file_paths', methods=['GET'])
def get_file_paths():
    # Get the data from Orders.dat
    orders_dat_path = r'../PRD-MtWellington/NZ8MTWDISP Managed Orders/Orders.dat'
    po, sku = get_production_data(orders_dat_path)

    # Check the original input length validity
    if po_length_check(po) and sku_length_check(sku): 
        return build_filepath(po, sku)
    else:
        # If the input is not valid, return an error message
        return jsonify({'error': 'Invalid input'}), 400
    
if __name__ == '__main__':
    app.run()
