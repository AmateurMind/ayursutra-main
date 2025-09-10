import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreparationChecklist = ({ checklistItems, onItemComplete, onAddNote }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [notes, setNotes] = useState({});

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev?.[itemId]
    }));
  };

  const handleNoteChange = (itemId, note) => {
    setNotes(prev => ({
      ...prev,
      [itemId]: note
    }));
  };

  const saveNote = (itemId) => {
    onAddNote(itemId, notes?.[itemId] || '');
  };

  const completedCount = checklistItems?.filter(item => item?.completed)?.length;
  const progressPercentage = (completedCount / checklistItems?.length) * 100;

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Preparation Checklist
        </h2>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-text-secondary">
            {completedCount}/{checklistItems?.length} completed
          </div>
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-success transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {checklistItems?.map((item) => (
          <div key={item?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={item?.completed}
                onChange={(e) => onItemComplete(item?.id, e?.target?.checked)}
                className="mt-1"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {item?.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-2">
                      {item?.sanskritTerm} - {item?.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item?.priority === 'high' ? 'bg-error/10 text-error' :
                      item?.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                    }`}>
                      <Icon name={item?.icon} size={16} />
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(item?.id)}
                      iconName={expandedItems?.[item?.id] ? "ChevronUp" : "ChevronDown"}
                      iconSize={16}
                    />
                  </div>
                </div>

                {expandedItems?.[item?.id] && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Detailed Instructions:</h4>
                        <ul className="text-sm text-text-secondary space-y-1">
                          {item?.detailedInstructions?.map((instruction, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Icon name="Dot" size={12} className="mt-1 text-primary" />
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {item?.timing && (
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <Icon name="Clock" size={16} className="text-primary" />
                            <span className="font-medium text-foreground">Timing</span>
                          </div>
                          <p className="text-sm text-text-secondary">{item?.timing}</p>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Add a personal note..."
                          value={notes?.[item?.id] || ''}
                          onChange={(e) => handleNoteChange(item?.id, e?.target?.value)}
                          className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => saveNote(item?.id)}
                          iconName="Plus"
                          iconSize={14}
                        >
                          Add Note
                        </Button>
                      </div>

                      {item?.notes && item?.notes?.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="font-medium text-foreground text-sm">Your Notes:</h5>
                          {item?.notes?.map((note, index) => (
                            <div key={index} className="bg-accent/5 rounded-lg p-2">
                              <p className="text-sm text-text-secondary">{note}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreparationChecklist;