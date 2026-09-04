import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Plus, Trash } from 'react-bootstrap-icons';
import styles from './Properties.module.css';
import { ResponseModel } from '../../../../Domain/Core/Entity/ResponseModel';

const TYPES = ['string', 'integer', 'boolean'];

/**
 * Props for the PropertiesEdition component
 * @interface PropertiesEditionProps
 * @property {Record<string, any>} properties - The properties object to edit
 * @property {string} languageId - The ID of the language
 * @property {string} objectUuid - The UUID of the object
 * @property {(languageId:string, objectUuid: string, data: Partial<{name: string; description: string; style: Record<string, unknown>; properties: Record<string, unknown>; constraint: string;}>) => void} updateFunction - Function to update properties
 */
interface PropertiesEditionProps {
  properties: Record<string, any>;
  languageId: string;
  objectUuid: string;
  updateFunction: (languageId:string, objectUuid: string, data: Partial<{
    name: string;
    description: string;
    style: Record<string, unknown>;
    properties: Record<string, unknown>;
    constraint: string;
  }>) => (void);
}

/**
 * Component for editing object properties with type selection
 * Allows adding, deleting, and renaming properties with types (string, integer, boolean)
 * @param {PropertiesEditionProps} props - The component props
 * @returns {JSX.Element} The rendered properties editor component
 */
export function PropertiesEdition({ properties, languageId, objectUuid, updateFunction }: PropertiesEditionProps) {
  const [localProperties, setLocalProperties] = useState<Record<string, any>>(properties);
  const [propertyNames, setPropertyNames] = useState<Record<string, string>>(
    Object.keys(properties).reduce((acc, key) => ({ ...acc, [key]: key }), {})
  );
  const [propertyTypes, setPropertyTypes] = useState<Record<string, string>>(
    Object.entries(properties).reduce((acc, [key, value]) => ({ ...acc, [key]: value?.type || 'string' }), {})
  );

  /**
   * Update properties with current names and types
   */
  const handleUpdateProperties = () => {
    const newProperties: Record<string, any> = {};
    Object.keys(localProperties).forEach((originalKey) => {
      const newName = propertyNames[originalKey] || originalKey;
      const newType = propertyTypes[originalKey] || 'string';
      newProperties[newName] = { type: newType };
    });
    updateFunction(languageId, objectUuid, { properties: newProperties });
  };

  /**
   * Add a new property with default string type
   */
  const handleAddProperty = () => {
    const newKey = `property_${Object.keys(localProperties).length + 1}`;
    const newProperties = { ...localProperties, [newKey]: { type: 'string' } };
    const newNames = { ...propertyNames, [newKey]: newKey };
    const newTypes = { ...propertyTypes, [newKey]: 'string' };
    setLocalProperties(newProperties);
    setPropertyNames(newNames);
    setPropertyTypes(newTypes);
    updateFunction(languageId, objectUuid, { properties: newProperties });
  };

  /**
   * Delete a property by name
   * @param {string} propertyName - The name of the property to delete
   */
  const handleDeleteProperty = (propertyName: string) => {
    const newProperties = { ...localProperties };
    const newNames = { ...propertyNames };
    const newTypes = { ...propertyTypes };
    delete newProperties[propertyName];
    delete newNames[propertyName];
    delete newTypes[propertyName];
    setLocalProperties(newProperties);
    setPropertyNames(newNames);
    setPropertyTypes(newTypes);
    updateFunction(languageId, objectUuid, { properties: newProperties });
  };

  /**
   * Handle property name change
   * @param {string} originalKey - The original property key
   * @param {string} newName - The new property name
   */
  const handlePropertyNameChange = (originalKey: string, newName: string) => {
    setPropertyNames({ ...propertyNames, [originalKey]: newName });
  };
  
  /**
   * Handle property type change
   * @param {string} originalKey - The original property key
   * @param {string} newType - The new property type
   */
  const handlePropertyTypeChange = (originalKey: string, newType: string) => {
      setPropertyTypes({ ...propertyTypes, [originalKey]: newType });
    };
    
  /**
   * Generate a unique property name to avoid conflicts
   * @param {string} desiredName - The desired property name
   * @param {string} excludeKey - The key to exclude from conflict check
   * @returns {string} A unique property name
   */
  const getUniquePropertyName = (desiredName: string, excludeKey: string): string => {
    const existingKeys = Object.keys(localProperties).filter(key => key !== excludeKey);
    if (!existingKeys.includes(desiredName)) {
      return desiredName;
    }
    let index = 1;
    let uniqueName = `${index}_${desiredName}`;
    while (existingKeys.includes(uniqueName)) {
      index++;
      uniqueName = `${index}_${desiredName}`;
    }
    return uniqueName;
  };

  /**
   * Handle property name blur event to validate uniqueness and update
   * @param {string} originalKey - The original property key
   * @param {string} currentName - The current property name
   */
  const handlePropertyNameBlur = (originalKey: string, currentName: string) => {
    if (!currentName.trim()) {
      setPropertyNames({ ...propertyNames, [originalKey]: originalKey });
    } else {
      const uniqueName = getUniquePropertyName(currentName.trim(), originalKey);
      if (uniqueName !== currentName.trim()) {
        setPropertyNames({ ...propertyNames, [originalKey]: uniqueName });
      }
    }
    handleUpdateProperties();
  };
  
  return (
    <div>
      {Object.entries(localProperties).map(([name, value]: [string, any]) => (
        <div className={styles.container} key={name}>
          <div className={styles.dropdown}>
            <Form.Select 
              value={propertyTypes[name] || 'string'}
              onChange={(e) => handlePropertyTypeChange(name, e.target.value)}
              onBlur={handleUpdateProperties}
            >
              {TYPES.map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {typeOption.charAt(0).toUpperCase() + typeOption.slice(1)}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className={styles.property_name}>
            <Form.Control
              className="w-100"
              type="text"
              value={propertyNames[name]}
              onChange={(e) => handlePropertyNameChange(name, e.target.value)}
              onBlur={(e) => handlePropertyNameBlur(name, e.target.value)}
              placeholder="Property name"
            />
          </div>
          <div className={styles.item}>
            <Button 
              variant="outline-danger" 
              size="sm" 
              onClick={() => handleDeleteProperty(name)}
              title="Delete property"
              className="px-2"
            >
              <Trash />
            </Button>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-end mt-2">
        <Button variant="outline-primary" size="sm" onClick={handleAddProperty}>
          <Plus className="me-1" /> Add Property
        </Button>
      </div>
    </div>
  );
}
