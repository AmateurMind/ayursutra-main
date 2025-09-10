import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const InstructionalContent = ({ videos, tips, emergencyContact }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [expandedTip, setExpandedTip] = useState(null);

  const playVideo = (videoId) => {
    setActiveVideo(videoId);
  };

  const toggleTip = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <div className="space-y-6">
      {/* Instructional Videos */}
      <div className="bg-card rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="Play" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Preparation Videos
            </h3>
            <p className="text-sm text-text-secondary">Learn from expert Vaidyas</p>
          </div>
        </div>

        <div className="grid gap-4">
          {videos?.map((video) => (
            <div key={video?.id} className="border border-border rounded-lg overflow-hidden">
              <div className="relative">
                <Image
                  src={video?.thumbnail}
                  alt={video?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => playVideo(video?.id)}
                    iconName="Play"
                    iconSize={24}
                    className="bg-white/90 text-foreground hover:bg-white"
                  >
                    Play Video
                  </Button>
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {video?.duration}
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold text-foreground mb-2">{video?.title}</h4>
                <p className="text-sm text-text-secondary mb-3">{video?.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="User" size={14} />
                    <span>{video?.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-warning">
                    <Icon name="Star" size={14} />
                    <span>{video?.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Preparation Tips */}
      <div className="bg-card rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Lightbulb" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Expert Tips
            </h3>
            <p className="text-sm text-text-secondary">Wisdom from experienced practitioners</p>
          </div>
        </div>

        <div className="space-y-3">
          {tips?.map((tip) => (
            <div key={tip?.id} className="border border-border rounded-lg">
              <button
                onClick={() => toggleTip(tip?.id)}
                className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={tip?.icon} size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{tip?.title}</h4>
                    <p className="text-sm text-text-secondary">{tip?.category}</p>
                  </div>
                </div>
                <Icon 
                  name={expandedTip === tip?.id ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-text-secondary" 
                />
              </button>

              {expandedTip === tip?.id && (
                <div className="px-4 pb-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-text-secondary mb-3">{tip?.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-text-secondary">
                        <Icon name="User" size={12} />
                        <span>Dr. {tip?.author}</span>
                      </div>
                      <div className="text-xs text-primary bg-primary/5 rounded px-2 py-1">
                        {tip?.experience} years experience
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="bg-error/5 border border-error/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
            <Icon name="Phone" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Emergency Contact
            </h3>
            <p className="text-sm text-text-secondary">Available 24/7 for urgent queries</p>
          </div>
        </div>

        <div className="bg-background rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-foreground">{emergencyContact?.name}</h4>
              <p className="text-sm text-text-secondary">{emergencyContact?.designation}</p>
            </div>
            <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
              <Icon name="UserCheck" size={20} className="text-error" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-text-secondary" />
              <span className="text-sm text-foreground">{emergencyContact?.phone}</span>
              <Button
                variant="outline"
                size="sm"
                iconName="Phone"
                iconSize={14}
                className="ml-auto"
              >
                Call Now
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="MessageCircle" size={16} className="text-text-secondary" />
              <span className="text-sm text-foreground">WhatsApp Available</span>
              <Button
                variant="outline"
                size="sm"
                iconName="MessageCircle"
                iconSize={14}
                className="ml-auto"
              >
                Message
              </Button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-warning/5 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium mb-1">When to Contact:</p>
                <ul className="text-xs text-text-secondary space-y-1">
                  <li>• Severe allergic reactions to prescribed preparations</li>
                  <li>• Unexpected symptoms or discomfort</li>
                  <li>• Questions about medication interactions</li>
                  <li>• Emergency rescheduling needs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionalContent;