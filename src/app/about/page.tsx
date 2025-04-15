"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t("about.title")}
        </h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {t("about.subtitle")}
        </p>
      </div>

      {/* Notre histoire */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("about.ourStory.title")}</h2>
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <p className="text-gray-600 mb-4">
            {t("about.ourStory.content1")}
          </p>
          <p className="text-gray-600 mb-4">
            {t("about.ourStory.content2")}
          </p>
          <p className="text-gray-600">
            {t("about.ourStory.content3")}
          </p>
        </div>
      </section>

      {/* Notre mission */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("about.ourMission.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="text-blue-600 text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-3">{t("about.ourMission.document.title")}</h3>
            <p className="text-gray-600">
              {t("about.ourMission.document.content")}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="text-blue-600 text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold mb-3">{t("about.ourMission.share.title")}</h3>
            <p className="text-gray-600">
              {t("about.ourMission.share.content")}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="text-blue-600 text-4xl mb-4">🚩</div>
            <h3 className="text-xl font-bold mb-3">{t("about.ourMission.preserve.title")}</h3>
            <p className="text-gray-600">
              {t("about.ourMission.preserve.content")}
            </p>
          </div>
        </div>
      </section>

      {/* Notre équipe */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("about.ourTeam.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Membre d'équipe 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Jean Kouam</h3>
              <p className="text-blue-600 text-sm mb-3">{t("about.ourTeam.founder")}</p>
              <p className="text-gray-600 mb-4">
                Passionné de technologie et de culture camerounaise, Jean a fondé CameroonPOI avec la vision de créer un pont entre tradition et innovation.
              </p>
            </div>
          </div>

          {/* Membre d'équipe 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Marie Nguemo</h3>
              <p className="text-blue-600 text-sm mb-3">{t("about.ourTeam.contentManager")}</p>
              <p className="text-gray-600 mb-4">
                Historienne de formation, Marie coordonne la recherche et la validation des informations sur les points d'intérêt pour garantir leur exactitude.
              </p>
            </div>
          </div>

          {/* Membre d'équipe 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Paul Mbarga</h3>
              <p className="text-blue-600 text-sm mb-3">{t("about.ourTeam.leadDeveloper")}</p>
              <p className="text-gray-600 mb-4">
                Expert en développement web et applications cartographiques, Paul est le cerveau technique derrière la plateforme CameroonPOI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contactez-nous */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("about.contactUs.title")}</h2>
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{t("about.contactUs.contactInfo")}</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Yaoundé, Cameroun</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@cameroonpoi.com</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+237 123 456 789</span>
                </li>
              </ul>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">{t("about.contactUs.followUs")}</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">{t("about.contactUs.sendMessage")}</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("about.contactUs.fullName")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t("about.contactUs.fullName")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("about.contactUs.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("about.contactUs.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t("about.contactUs.message")}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {t("about.contactUs.send")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("about.cta.title")}</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          {t("about.cta.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/map"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            {t("about.cta.exploreMap")}
          </Link>
          <Link
            href="/pois"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
          >
            {t("about.cta.viewPois")}
          </Link>
        </div>
      </div>
    </div>
  );
}
