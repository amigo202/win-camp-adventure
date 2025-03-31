import React from 'react';
import Header from '../components/Header';
import GuideNavigation from '../components/GuideNavigation';
import { getCurrentUser } from '../utils/authUtils';
import StarsBackground from '../components/StarsBackground';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Laptop, Bot, Code, Lightbulb, ChevronRight } from 'lucide-react';

const Index = () => {
  const user = getCurrentUser();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 to-indigo-950 overflow-hidden">
      <StarsBackground />
      
      {/* Header Component */}
      <div className="container mx-auto px-4 pt-4">
        <Header />
        {user && <GuideNavigation />}
      </div>
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center relative mt-8">
        <div 
          className="w-full max-w-6xl mx-auto bg-cover bg-center rounded-xl overflow-hidden relative animate-fade-in"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1531482615713-2afd69aebba0')",
            height: "500px"
          }}
        >
          <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"></div>
          <div className="text-center relative z-10 text-white p-8 h-full flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-pulse-glow">ברוכים הבאים למחנה WIN CAMP</h1>
            <p className="text-xl mb-4">עולם של הרפתקאות טכנולוגיות, יצירה ולמידה</p>
            <div className="mt-6 text-lg opacity-80">מחנה מחשבים מרגש לילדים סקרניים וחדשניים</div>
            
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link 
                to="/tools" 
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all transform hover:scale-105"
              >
                <span className="flex items-center">
                  <Laptop className="ml-2" size={18} />
                  הכלים שלנו
                </span>
              </Link>
              <Link 
                to="/login" 
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full transition-all backdrop-blur-sm transform hover:scale-105"
              >
                <span className="flex items-center">
                  התחברות למדריכים
                  <ChevronRight className="mr-1" size={18} />
                </span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="w-full max-w-6xl mx-auto mt-12 px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl transition-all hover:bg-indigo-800/40 hover:scale-105 duration-300">
              <div className="flex items-center mb-3">
                <Code className="text-wincamp-yellow mr-2" size={24} />
                <h3 className="text-xl font-bold text-white">למידה חווייתית</h3>
              </div>
              <p className="text-white/80">תכנות, משחקים, ויצ��רה בסביבה תומכת ומהנה</p>
            </div>
            <div className="glass-card p-6 rounded-xl transition-all hover:bg-indigo-800/40 hover:scale-105 duration-300">
              <div className="flex items-center mb-3">
                <Bot className="text-wincamp-turquoise mr-2" size={24} />
                <h3 className="text-xl font-bold text-white">כלים חדשניים</h3>
              </div>
              <p className="text-white/80">גישה למגוון כלים טכנולוגיים עדכניים ומתקדמים</p>
            </div>
            <div className="glass-card p-6 rounded-xl transition-all hover:bg-indigo-800/40 hover:scale-105 duration-300">
              <div className="flex items-center mb-3">
                <Lightbulb className="text-wincamp-orange mr-2" size={24} />
                <h3 className="text-xl font-bold text-white">פיתוח מיומנויות</h3>
              </div>
              <p className="text-white/80">חיזוק יכולות חשיבה, יצירתיות ופתרון בעיות</p>
            </div>
          </div>
        </div>
        
        {/* Kids Learning Computers Carousel */}
        <div className="w-full max-w-6xl mx-auto mb-16 px-4">
          <div className="flex items-center mb-8">
            <Sparkles className="ml-2 text-wincamp-yellow" size={24} />
            <h2 className="text-2xl font-bold text-white">ילדים מגלים את עולם המחשבים</h2>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden rounded-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="ילד לומד תכנות" 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent"></div>
                      <div className="absolute bottom-0 p-4 text-white">
                        <h3 className="font-bold">לימוד תכנות בדרך חווייתית</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden rounded-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="ילדים עובדים יחד על מחשב" 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent"></div>
                      <div className="absolute bottom-0 p-4 text-white">
                        <h3 className="font-bold">עבודת צוות ולמידה משותפת</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden rounded-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1587613864521-85454d8117cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="ילדה משתמשת במחשב"
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent"></div>
                      <div className="absolute bottom-0 p-4 text-white">
                        <h3 className="font-bold">פיתוח יצירתיות וחשיבה מחוץ לקופסה</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden rounded-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1566140967404-b8b3932483f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="ילדים עובדים על פרויקט רובוטיקה"
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent"></div>
                      <div className="absolute bottom-0 p-4 text-white">
                        <h3 className="font-bold">התנסות ברובוטיקה ומדעים</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="bg-white/20 text-white border-0 hover:bg-white/30" />
            <CarouselNext className="bg-white/20 text-white border-0 hover:bg-white/30" />
          </Carousel>
        </div>
        
        {/* Call to Action */}
        <div className="w-full max-w-5xl mx-auto mb-16 px-4">
          <div className="glass-card p-8 rounded-xl text-center relative overflow-hidden animate-float">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wincamp-turquoise via-wincamp-purple to-wincamp-orange"></div>
            <h2 className="text-2xl font-bold text-white mb-4">הצטרפו אלינו למסע טכנולוגי מרתק!</h2>
            <p className="text-white/90 mb-6 max-w-3xl mx-auto">במחנה WIN CAMP, אנו מאמינים שכל ילד יכול להפוך לממציא, מתכנת או יזם של המחר. בואו לגלות את הפוטנצי��ל!</p>
            <Link 
              to="/tools" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-wincamp-purple to-wincamp-blue text-white font-medium rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              גלו את הכלים שלנו
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
