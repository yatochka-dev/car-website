import RichTextSection from '@/components/richtext-section'

export default function privacyPolicy() {
  return (
    <RichTextSection>
      <div
        dir="rtl"
        className="max-w-3xl mx-auto text-right space-y-8 text-neutral-200 leading-relaxed"
      >
        <h1 className="text-4xl font-bold">מדיניות פרטיות</h1>

        <p>
          אתר זה משמש כעמוד מידע ויצירת קשר בלבד. אנו מכבדים את פרטיות המשתמשים באתר ומתחייבים לעשות
          שימוש במידע הנמסר אך ורק לצורך טיפול בפניות.
        </p>

        <div>
          <h2 className="text-2xl font-semibold mb-2">מידע שנאסף</h2>
          <p>בעת שליחת טופס יצירת קשר באתר ייתכן וייאסף המידע הבא:</p>
          <ul className="list-disc pr-6 mt-2 space-y-1">
            <li>שם</li>
            <li>מספר טלפון</li>
            <li>תוכן ההודעה</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">אופן השימוש במידע</h2>
          <p>
            המידע הנשלח דרך טופס יצירת הקשר משמש אך ורק לצורך יצירת קשר עם הפונה ומתן מענה לפנייה.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">אופן העברת המידע</h2>
          <p>
            ההודעות הנשלחות דרך האתר מועברות למערכת פנימית של מנהלי האתר (קבוצת Telegram פרטית)
            לצורך טיפול בפנייה.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">אחסון מידע</h2>
          <p>האתר עצמו אינו שומר מידע אישי של משתמשים במסד נתונים.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">זכויות המשתמש</h2>
          <p>ניתן לפנות לבעלי האתר בכל עת בבקשה למחיקת מידע אישי שנשלח דרך האתר.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">עדכון המדיניות</h2>
          <p>בעלי האתר רשאים לעדכן מדיניות פרטיות זו מעת לעת.</p>
        </div>
      </div>
    </RichTextSection>
  )
}
