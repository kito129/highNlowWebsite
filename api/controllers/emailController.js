const mongoose = require("mongoose");
//for mail
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

//GET
exports.email_send_email = (req, res, next) => {

  // security
  const myOAuth2Client = new OAuth2(
    process.env.ID_CLIENT,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  myOAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_CODE
  });

  const myAccessToken = myOAuth2Client.getAccessToken();

  // create the trasporter and login wth token
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER, //your gmail account you used to set the project up in google cloud console"
        clientId: process.env.ID_CLIENT,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_CODE,
        accessToken: myAccessToken //access token variable we defined earlier
    }});

  // CHECK MAIL

  // configure the mail
  var mailOptions = {
    from: process.env.GMAIL_USER,//replace with your email
    to: 'selva.marco.bet@gmail.com',//replace with your email
    subject: `Contact name: ${req.body.name}`,
    html:`
          <h1>New registration on high n low</h1>
          <h2> name:${req.body.name} </h2><br>
          <h2> email:${req.body.email} </h2><br>
        `
  };

  // send the mail 
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('error') // if error occurs send error as response to client
    }
    else {
      console.log("\n" + 'CHECK MAIL SEND: ' + info.response + "\n");
      res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
    }
  });
  
  // SUBSCRIBER  MAIL

  var to = req.body.email;

  // configure the mail
  var mailOptions = {
    from: "info@highnlow.it",//replace with your email
    to: to,//replace with your email
    subject: `Benvenuto in HighNLow, ${req.body.name}!`,
    // todo
    html:`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
		<!--[if gte mso 9]>
		<xml>
			<o:OfficeDocumentSettings>
			<o:AllowPNG/>
			<o:PixelsPerInch>96</o:PixelsPerInch>
			</o:OfficeDocumentSettings>
		</xml>
		<![endif]-->
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="format-detection" content="date=no" />
		<meta name="format-detection" content="address=no" />
		<meta name="format-detection" content="telephone=no" />
		<meta name="x-apple-disable-message-reformatting" />
		<!--[if !mso]><!-->
		<link href="https://fonts.googleapis.com/css?family=Muli:400,400i,700,700i" rel="stylesheet" />
		<!--<![endif]-->
		<title>Email Template</title>
		<!--[if gte mso 9]>
		<style type="text/css" media="all">
			sup { font-size: 100% !important; }
		</style>
		<![endif]-->
		

		<style type="text/css" media="screen">
			/* Linked Styles */
			body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#2f323a; -webkit-text-size-adjust:none }
			a { color:#d1d424ec; text-decoration:none }
			p { padding:0 !important; margin:0 !important } 
			img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
			.mcnPreviewText { display: none !important; }

					
			/* Mobile styles */
			@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
				.mobile-shell { width: 100% !important; min-width: 100% !important; }
				.bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; }
				
				.text-header,
				.m-center { text-align: center !important; }
				
				.center { margin: 0 auto !important; }
				.container { padding: 20px 10px !important }
				
				.td { width: 100% !important; min-width: 100% !important; }

				.m-br-15 { height: 15px !important; }
				.p30-15 { padding: 30px 15px !important; }

				.m-td,
				.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

				.m-block { display: block !important; }

				.fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

				.column,
				.column-top,
				.column-empty,
				.column-empty2,
				.column-dir-top { float: left !important; width: 100% !important; display: block !important; }

				.column-empty { padding-bottom: 10px !important; }
				.column-empty2 { padding-bottom: 30px !important; }

				.content-spacing { width: 15px !important; }
			}
		</style>
	</head>
	<body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#2f323a; -webkit-text-size-adjust:none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#2f323a">
			<tr>
				<td align="center" valign="top">
					<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
						<tr>
							<td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
								<!-- Header -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td class="p30-15" style="padding: 0px 30px 30px 30px;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<th class="column-top" width="145" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
														<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://ik.imagekit.io/uvbstpfvet/Artboard_1_BIeNyVQaZ.png" width="114" height="114" border="0" alt="HnL logo" /></td>
															</tr>
														</table>
													</th>
													<th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
													<th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
														<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
															</tr>
														</table>
													</th>
												</tr>
											</table>
										</td>
									</tr>
								</table>
								<!-- END Header -->

								<!-- Intro -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td style="padding-bottom: 10px;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td class="tbrr p30-15" style="padding: 60px 30px; border-radius:26px 26px 0px 0px;" bgcolor="#191919">
														<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td class="h1 pb25" style="color:#ffffff; font-family:'Muli', Arial,sans-serif; font-size:40px; line-height:46px; text-align:center; padding-bottom:25px;">Benvenuto in HighNLow</td>
															</tr>
															<tr>
																<td class="text-center pb25" style="color:#c1cddc; font-family:'Muli', Arial,sans-serif; font-size:16px; line-height:30px; text-align:center; padding-bottom:25px;">Il tuo collegamento diretto con i mercati.</td>
															</tr>
															<!-- Button -->
															<tr>
																<td align="center">
																	<table class="center" border="0" cellspacing="0" cellpadding="0" style="text-align:center;">
																		<tr>
																			<td class="pink-button text-button" style="background:#2f323a; color:#c1cddc; font-family:'Muli', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:0px 22px 22px 22px; font-weight:bold;"><a href="www.highnlow.it" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">VISITA IL SITO</span></a></td>
																		</tr>
																	</table>
																</td>
															</tr>
															<!-- END Button -->
														</table>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
								<!-- END Intro -->

								<!-- Article / Full Width Image + Title + Copy + Button -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td style="padding-bottom: 10px;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#191919">
												<tr>
													<td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://ik.imagekit.io/uvbstpfvet/Artboard_15_DJc-tWxbmW.png" width="650" height="366" border="0" alt="Benvenuto" /></td>
												</tr>
												<tr>
													<td class="p30-15" style="padding: 50px 30px;">
														<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td class="h3 pb20" style="color:#ffffff; font-family:'Muli', Arial,sans-serif; font-size:25px; line-height:32px; text-align:left; padding-bottom:20px;">Aggiornamenti continui dai mercati</td>
															</tr>
															<tr>
																<td class="text pb20" style="color:#ffffff; font-family:Arial,sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:20px;">Segui il nostro sito per restare sempre aggiornato sulle notizie di mercato, sulle view e su idee su titoli, azioni o futures. <br><br> Segui le nostre idee su <a href="https://it.tradingview.com/u/HighnLow/">TradingView</a> e rivedi come sono andate le nostre analisi.</td>
															</tr>
															<!-- Button -->
															<tr>
																<td align="left">
																	<table border="0" cellspacing="0" cellpadding="0">
																		<tr>
																			<td class="blue-button text-button" style="background:#d1d424ec; color:#c1cddc; font-family:'Muli', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:0px 22px 22px 22px; font-weight:bold;"><a href="http://www.highnlow.it/assets/pages/mercati.html" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">VISITA I MERCATI</span></a></td>
																		</tr>
																	</table>
																</td>
															</tr>
															<!-- END Button -->
														</table>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
								<!-- END Article / Full Width Image + Title + Copy + Button -->

								<!-- Two Columns / Articles -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td style="padding-bottom: 10px;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#191919">
												<tr>
													<td class="p30-15" style="padding: 50px 30px;">
														<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<th class="column-top" width="280" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																	<table width="100%" border="0" cellspacing="0" cellpadding="0">
																		<tr>
																			<td class="fluid-img pb25" style="font-size:0pt; line-height:0pt; text-align:left; padding-bottom:25px;"><img src="https://ik.imagekit.io/uvbstpfvet/Artboard_6_UWm_0EVBR7.png" width="280" height="157" border="0" alt="" /></td>
																		</tr>
																		<tr>
																			<td class="h4 pb20" style="color:#ffffff; font-family:'Muli', Arial,sans-serif; font-size:20px; line-height:28px; text-align:left; padding-bottom:20px;">Articoli</td>
																		</tr>
																		<tr>
																			<td class="text pb20" style="color:#ffffff; font-family:Arial,sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:20px;">News, approfondimenti di mercato e formazione gratuita, tutte le conoscenze che avrai bisogno per affrontare il mondo dei mercati.</td>
																		</tr>
																		<!-- Button -->
																		<tr>
																			<td align="left">
																				<table border="0" cellspacing="0" cellpadding="0">
																					<tr>
																						<td class="blue-button text-button" style="background:#d1d424ec; color:#c1cddc; font-family:'Muli', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:0px 22px 22px 22px; font-weight:bold;"><a href="http://www.highnlow.it/assets/pages/articoli.html" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Vedi Articoli</span></a></td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																		<!-- END Button -->
																	</table>
																</th>
																<th class="column-empty2" width="30" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
																<th class="column-top" width="280" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																	<table width="100%" border="0" cellspacing="0" cellpadding="0">
																		<tr>
																			<td class="fluid-img pb25" style="font-size:0pt; line-height:0pt; text-align:left; padding-bottom:25px;"><img src="https://ik.imagekit.io/uvbstpfvet/Artboard_10_YAgXiwUr9f.png" width="280" height="157" border="0" alt="" /></td>
																		</tr>
																		<tr>
																			<td class="h4 pb20" style="color:#ffffff; font-family:'Muli', Arial,sans-serif; font-size:20px; line-height:28px; text-align:left; padding-bottom:20px;">Idee</td>
																		</tr>
																		<tr>
																			<td class="text pb20" style="color:#ffffff; font-family:Arial,sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:20px;">Le nostre visioni di mercato, su titoli futures e forex e commodities.</td>
																		</tr>
																		<!-- Button -->
																		<tr>
																			<td align="left">
																				<table border="0" cellspacing="0" cellpadding="0">
																					<tr>
																						<td class="blue-button text-button" style="background:#d1d424ec; color:#c1cddc; font-family:'Muli', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:0px 22px 22px 22px; font-weight:bold;"><a href="http://www.highnlow.it/assets/pages/idee.html" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Vedi Idee</span></a></td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																		<!-- END Button -->
																	</table>
																</th>
															</tr>
														</table>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
								<!-- END Two Columns / Articles -->

								<!-- Intro -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td style="padding-bottom: 10px;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td class="tbrr p30-15" style="padding: 60px 30px; border-radius:26px 26px 0px 0px;" bgcolor="#191919">
														<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td class="h1 pb25" style="color:#ffffff; font-family:'Muli', Arial,sans-serif; font-size:40px; line-height:46px; text-align:center; padding-bottom:25px;">Scopri i nostri partner</td>
															</tr>
															<tr>
																<td class="text-center pb25" style="color:#c1cddc; font-family:'Muli', Arial,sans-serif; font-size:16px; line-height:30px; text-align:center; padding-bottom:25px;">Con l'iscrizione al broker partner avrai accesso ai contenuti escusivi di High N Low. <br><br> Una guida che ti permetterà i individuare livelli sensibili all'interno dei mercati, e di sfruttarli a tuo vantaggio.</td>
															</tr>
															<!-- Button -->
															<tr>
																<td align="center">
																	<table class="center" border="0" cellspacing="0" cellpadding="0" style="text-align:center;">
																		<tr>
																			<td class="pink-button text-button" style="background:#2f323a; color:#c1cddc; font-family:'Muli', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:0px 22px 22px 22px; font-weight:bold;"><a href="http://www.highnlow.it/partner" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">CONTATTI</span></a></td>
																		</tr>
																	</table>
																</td>
															</tr>
															<!-- END Button -->
														</table>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
								<!-- END Intro -->

								<!-- Footer -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td class="p30-15 bbrr" style="padding: 50px 30px; border-radius:0px 0px 26px 26px;" bgcolor="#191919">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td class="text-footer1 pb10" style="color:#c1cddc; font-family:'Muli', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;">High N Low, il tuo collegamento diretto con i mercati.</td>
												</tr>
												<tr>
													<td class="text-footer2" style="color:#8297b3; font-family:'Muli', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center;">
														<h2>Disclamer</h2>
														<p>
															Questo sito ha finalità esclusivamente informative e didattiche e non è da intendersi in alcun modo come un’offerta di vendita, consulenza (fiscale, legale o finanziaria) o come una sollecitazione all’investimento o al pubblico risparmio. 
															Il contenuto di questo sito si basa su dati e informazioni di pubblico dominio che noi consideriamo affidabili, ma di cui non siamo in grado di garantire l’esattezza, l’accuratezza e la completezza e che non implicano in ogni caso alcuna responsabilità da parte Nostra. 
															<br><br>Le informazioni pubblicate possono basarsi su determinati dati, presupposti, opinioni o previsioni che possono anche cambiare nel tempo, ed in ogni caso hanno sempre e comunque solo uno scopo didattico e non devono essere considerate come raccomandazioni d’acquisto. 
															L’utente pertanto dovrà sempre verificarne l’esattezza e l’attualità e qualora decidesse di investire negli strumenti finanziari analizzati e/o commentati lo farà assumendosene la piena responsabilità.
															<br><br>Le informazioni e i documenti pubblicati sul Sito hanno finalità informativa e/o pubblicitaria/promozionale, e non sono in alcun modo da intendersi né come consulenza, né come ricerca in materia di investimenti; 
															qualsiasi prodotto, strumento, servizio di investimento cui fa riferimento il Sito potrebbe essere non adeguato per l’utente.
														</p>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td class="text-footer3 p30-15" style="padding: 40px 30px 0px 30px; color:#475c77; font-family:'Muli', Arial,sans-serif; font-size:12px; line-height:18px; text-align:center;">
											<!-- UNSUBRRIBR
											<a href="#" target="_blank" class="link2-u" style="color:#475c77; text-decoration:underline;"><span class="link2-u" style="color:#475c77; text-decoration:underline;">Unsubscribe</span></a> from this mailing list.
												-->
										</td>
									</tr>
								</table>
								<!-- END Footer -->
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
	</html>

        
        `
  };

  // send the mail for subscriber
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('error') // if error occurs send error as response to client
    }
    else {
      console.log("\n" + 'SUBSCRIBER MAIL SEND: ' + info.response + "\n");
      res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
    }
  });
  
};
  
  