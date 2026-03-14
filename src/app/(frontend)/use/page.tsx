import RichTextSection from '@/components/richtext-section'

export default function EUA() {
  return (
    <RichTextSection>
      <div
        dir="rtl"
        className="max-w-3xl mx-auto text-right space-y-8 text-neutral-200 leading-relaxed"
      >
        <h1 className="text-4xl font-bold">תנאי שימוש</h1>

        <p>
          השימוש באתר כפוף לתנאים המפורטים להלן. גלישה באתר או שימוש בו מהווים הסכמה לתנאים אלו.
        </p>

        <div>
          <h2 className="text-2xl font-semibold mb-2">שימוש באתר</h2>
          <p>
            האתר נועד להציג מידע אודות השירותים המוצעים ולאפשר יצירת קשר עם בעלי האתר. אין לעשות
            שימוש באתר למטרות בלתי חוקיות או לשלוח דרך טופס יצירת הקשר תוכן פוגעני, מטעה או זדוני.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">אחריות</h2>
          <p>
            המידע באתר מוצג כפי שהוא ("AS IS"). בעלי האתר אינם מתחייבים כי המידע באתר יהיה מלא,
            מדויק או מעודכן בכל עת.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">הגבלת אחריות</h2>
          <p>בעלי האתר אינם אחראים לכל נזק ישיר או עקיף שייגרם כתוצאה משימוש באתר.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">קניין רוחני</h2>
          <p>
            כל התכנים באתר, לרבות טקסטים, עיצוב, תמונות וסימנים מסחריים, שייכים לבעלי האתר ואין
            לעשות בהם שימוש ללא אישור.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">שינוי תנאים</h2>
          <p>בעלי האתר רשאים לעדכן תנאי שימוש אלו בכל עת.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">דין וסמכות שיפוט</h2>
          <p>על תנאים אלו יחולו דיני מדינת ישראל בלבד.</p>
        </div>
      </div>
    </RichTextSection>
  )
}
